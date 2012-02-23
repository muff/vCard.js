

var vCardParser = function(input){

		var props = /type=(.*?)[:;]/gi,
			prop = /type=(.*?)[:;]/i,
			stripProps = function(str){

				var a,
					m = str.match(props),
					properties = [];
				if(m && m.length){
					for(a in m){
						properties.push(m[a].match(prop)[1]);
						str = str.replace(m[a], '');
					}
				}
				return {
					value: str,
					props: properties
				};
			};

		var Address = function(match){
			var a, res = {}, addressfields = ['Address3','Address2','Address1', 'City', 'State', 'Zip', 'Country'];
			for(a in match){
				res[addressfields[a]] = match[a].match(/[\w\d]/) ? match[a] : '';
			}
			return res;
		};
		var Phone = function(match){
			return stripProps(match);
		};

		var Email = function(match){
			return stripProps(match);
		};
		var Network = function(match){
			return match;
		};

		var Card = function(){
			return {
				'name': null,
				'id': null,
				'networks': [],
				'image': null,
				'company': null,
				'title': null,
				'address': [],
				'email': [],
				'phone': [],
				'urls': []
			};
		};
		var Photo = function(match){
			var encoding, data, types = /(png|jpeg|jpg|gif)/i;
				encoding = match[2].match(types)[1].toLowerCase();
				data = match[3];
				return 'data:image/'+encoding+';base64'+data;	
		};

		var self = {};
			self.state = { view: 'list'};
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
				"FN": "name",
				"ORG": 'company',
				"TITLE": 'title',
				"EMAIL": 'email',
				"PHOTO": 'image',
				"BDAY": 'birthdate',
				"URL": 'urls'
			};
			self.listenFor = {
				"VERSION FN ORG TITLE": function(match){
					return  {
						key: self.translate[match[1]] || match[1],
						value: match[2]
					};
				},
				"PHOTO": function (match) {
					return {
						key: 'image',
						value: Photo(match)
					};
				},
				"EMAIL BDAY": function  (match) {
					return  {
						key: self.translate[match[1]] || match[1],
						value: match[3]
					};
				},
				"URL": function(match){
					return {
						key: 'urls',
						value: stripProps(match[2])
					};
				},
				"ADR": function (match){
					var ad = match[3].split('type=pref:');
					var address = ad.toString().split(';');
					return {
						key: 'address',
						value: Address(address)
					};
				},
				"twitter facebook linkedin github":function(match){
					return {
						key: 'networks',
						value: Network(match[2])
					};
				}
			};
			self.readCard = function(card){
				var line = card.split('\n'),
					a, // line iterator
					b, // expression iterator
					c, // listen iterator
					m, // current match
					r, // current translation results
					d = new Card(), // for storing data
					l = self.listenFor;

				var x = {
					'simple': /^(version|fn|title|org)\:(.+)$/i
,					'items': /^item\d{1,2}\.(.*?)[;:]type=(.*?);(.*?)$/i
,					'itm': /^item\d{1,2}\.(.*?)[;:](.*?)$/i
,					'email': /^(ÊMAIL);.*?\:(.*?@.*?)$/i
,					'networks': /^X-SOCIALPROFILE;type=(.*?):(.*?)$/i
,					'complex': /^([^\:\;]+);([^\:]+)\:(.+)$/
//					'key': /item\d{1,2}\./,
//					'properties': /((type=)?(.+);?)+/
				};
				lineloop: for(a in line){
					//console.log(line[a]);
					for(b in x){
						m = line[a].match(x[b]);
						if(m && m.length){
							for(c in l){
								if(c.match && c.match(m[1])){
									r = l[c](m);
									if(d[r.key] && typeof d[r.key] == 'object'){
										d[r.key].push(r.value);
									}else{
										d[r.key] = r.value;
									}
									continue lineloop;
								}
							}
							//console.log(m);
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
		module.exports = vCardParser;
}else{
	window.vCardParser = vCardParser;
}

