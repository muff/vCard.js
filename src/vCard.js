var vCardParser = function(input){
		var props = /type=(.*?)[:;]/gi,
			prop = /type=(.*?)[:;]/i,
			stripProps = function(str){
				if(!str){return str;}
				var a,
					m = str.match(props),
					properties = [];
				if(m && m.length){
					for(a in m){
						properties.push(m[a].match(prop)[1]);
						str = str.replace(m[a], '');
					}
				}
				if(!properties.length){
					properties = null;
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
		var Name = function(match){
			var a, res = {}, namefields = ['Lastname','Firstname','Middlename1', 'Middlename2','Middlename3'];
			for(a in match){
				res[namefields[a]] = match[a].match(/[\w\d]/) ? match[a] : '';
			}
			console.log(match, res);
			return res;
		};
		var Phone = function(match){
			return stripProps(match);
		};

		var Email = function(match){
			return stripProps(match);
		};
		
		var Network = function(match){
			return {
				url: match[2],
				type: match[1]
			};
		};

		var Photo = function(match){
			var encoding, data, types = /(png|jpeg|jpg|gif)/i;
				encoding = match[2].match(types)[1].toLowerCase();
				data = match[3];
				return 'data:image/'+encoding+';base64'+data;	
		};

		var Card = function(){
			return {
				'name': null,
				'names': null,
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
		
		var self = {};
			self.state = { view: 'list'};
			self.to_html= function(tmpl, data, options){
				return Mustache.to_html(tmpl, data);
			};
			self.to_json= function(data,options){};
			self.parse= function(str){
				self.cards = str.split('END:VCARD');
				self.data = [];
				var r = self.readCard, c = self.cards, d = self.data,  a;
				for(a in c){
					d.push(r(c[a]));
				}
				//console.log(self.to_html(window.template, {cards: d}));
				$('#content').html(self.to_html(window.template, {cards: d}));				

			};
			self.translate = {
				"FN": "name",
				"ORG": 'company',
				"TITLE": 'title',
				"EMAIL": 'email',
				"PHOTO": 'image',
				"BDAY": 'birthdate',
				"URL": 'urls',
				"ROLE": 'role',
				"TEL": 'phone',
				"N": 'names'
			};
			self.listenFor = {
				"N": function (match){
					console.log(match);
					var name = match[2].split(';');
					return {
						key: 'names',
						value: Name(name)
					};
				},
				"VERSION FN ORG URL TEL ROLE TITLE": function(match){
					return  {
						key: self.translate[match[1]] || match[1],
						value: stripProps(match[2])
					};
				},
				"PHOTO LOGO": function (match) {
					return {
						key: 'image',
						value: Photo(match)
					};
				},
				"X-ABLabel":function(match, prev){
					if(typeof prev == 'object'){						
						prev.label = match[2];
					}else{
						prev = {
							value: prev,
							label: match[2]
						};
					}
					return false;
				},
				"EMAIL BDAY": function  (match) {
					return  {
						key: self.translate[match[1]] || match[1],
						value: Email(match[3])
					};
				},
				"ADR": function (match){
					var ad = match[3].split('type=pref:');
					var pref = ad.length > 1;
					var address = ad.toString().split(';');
					return {
						pref: pref,
						key: 'address',
						value: Address(address)
					};
				},
				

				"twitter facebook linkedin github":function(match){
					return {
						key: 'networks',
						value: Network(match)
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
					prev, // previous object, in case of labels
					d = new Card(), // for storing data
					l = self.listenFor;

				var x = {
					'simple': /^(version|fn|n|title|org)\:(.+)$/i
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
									r = l[c](m, prev);
									
									if(r && d[r.key] && typeof d[r.key] == 'object'){
									d[r.key].push(r.value);
									prev = d[r.key][(d[r.key].length-1)];
									}else{
										d[r.key] = r.value;
										prev = d[r.key];
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

