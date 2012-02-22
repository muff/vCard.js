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
			self.listenFor = {
				"VERSION": function(line){
					return line[2];
				},
				"FN": function(line){
					return  line[2];
				},
				"ORG": function  (line) {
					return  line[2];
				},
				"TITLE": function (line) {
					return line[2];
				},
				
			};
			self.readCard = function(card){
				var d = card.split('\n'),
				a, b, m, c = {}, l = self.listenFor;

				var r = {
					'simple': /^(version|fn|title|org)\:(.+)$/i,
					'complex': /^([^\:\;]+);([^\:]+)\:(.+)$/,
					'key': /item\d{1,2}\./,
					'properties': /((type=)?(.+);?)+/
				};				
				for(a in d ){
					c[a] = {};
					for(b in r){						
						m = d[a].match(r[b]);

						if(m && m.length){							
							console.log(m);
							if(l[m[1]] && !c[a][m[1]]){
								c[a][m[1]] = l[m[1]](m);								
							}
						}
					}
				}
				console.log(c);
				return c;
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

