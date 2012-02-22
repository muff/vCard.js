var vCard = function(input){
		var self = {};
			self.state = { view: 'list'},
			self.to_html= function(tmpl, data, options){};
			self.to_json= function(data,options){};
			self.parse= function(str){
				self.cards = str.split('END:VCARD');
				self.data = [];
				var r = self.readCard, c = self.cards, d = self.data,  a;
				for(a in c){
					d.push(r(c[a]));
				}
			};
			self.translate = {
				"FN": "name"
			};
			self.listenFor = {
				"VERSION FN URL ORG TITLE": function(match){
					return  {
						key: self.translate[match[1]] || match[1],
						value: match[2]
					};
				},
				"ADR": function (match) {
					var ad = match[3].split('type=pref:;');
					return {
						key: 'adr',
						value: ad.toString().split(';')
					};
				},
				"twitter facebook linkedin github":function(match){
					return {
						key: match[1],
						value: match[2]
					}
				}
			};
			self.readCard = function(card){
				var line = card.split('\n'),
					a, // line iterator
					b, // expression iterator
					c, // listen iterator
					m, // current match
					r, // current translation results
					d = {}, // for storing data
					l = self.listenFor;

				var x = {
					'simple': /^(version|fn|title|org)\:(.+)$/i
,					'items': /^item\d{1,2}\.(.*?)[;:]type=(.*?);(.*?)$/i
,					'itm': /^item\d{1,2}\.(.*?)[;:](.*?)$/i
,					'networks': /^X-SOCIALPROFILE;type=(.*?):(.*?)$/i
//					'complex': /^([^\:\;]+);([^\:]+)\:(.+)$/,
//					'key': /item\d{1,2}\./,
//					'properties': /((type=)?(.+);?)+/
				};
				lineloop: for(a in line){
					console.log(line[a]);
					for(b in x){
						m = line[a].match(x[b]);
						if(m && m.length){	
							//console.log(m);						
							for(c in l){								
								if(c.match && c.match(m[1])){
									r = l[c](m);
									console.log(c, c.match(m[1]), r);
									d[r.key] = r.value;
									continue lineloop;
								}
							}
						}
					}
				}
				console.log(d);
				return d;
			};
			self.parse(input);
	return self;

};

// Node & Browser bindings
if (typeof require != "undefined") {
		//console.log(vCard);
		module.exports = vCard;
}else{
	window.vCard = vCard;
}

