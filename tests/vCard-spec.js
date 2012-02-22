if (typeof require != "undefined") {
    var buster = require("buster");
    var vCard = require("../src/vCard");
}
var data = 'BEGIN:VCARD\nVERSION:3.0\nPRODID:-\/\/AppleInc.\/\/AddressBook6.1\/\/EN\nN:Ingebrigtsen;Eivind;;;\nFN:EivindIngebrigtsen\nORG:BekkConsultingAS;\nTITLE:Manager\nEMAIL;type=INTERNET;type=HOME;type=pref:eivind@me.com\nitem1.ADR;type=HOME;type=pref:;;Grimstadgata23d;Oslo;;0464;Norway\nitem1.X-ABADR:us\nX-SOCIALPROFILE;type=twitter:http:\/\/twitter.com/muff\nX-SOCIALPROFILE;type=twitter:http:\/\/twitter.com/muff\nX-SOCIALPROFILE;type=linkedin:http:\/\/www.linkedin.com/in/eivindingebrigtsen\nX-SOCIALPROFILE;type=facebook:https:\/\/www.facebook.com/dnivie\nitem2.URL;type=pref:http:\/\/eivindingebrigtsen.com\nitem2.X-ABLabel:Website\nitem3.URL:http:\/\/www.bekk.no\nitem3.X-ABLabel:CompanyWebsite\nBDAY;value=date:1978-11-13\nX-AIM;type=HOME;type=pref:eivind@me.com\nIMPP;X-SERVICE-TYPE=AIM;type=HOME;type=pref:aim:eivind@me.com\nPHOTO;ENCODING=b;TYPE=JPEG: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\/\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\/\/AAiPjK80q21c5vbaN/3E/OQWQ5GQejDDDJwRk168KuEdPmjRir73Ute97P8Ar8TmlOVkk728/wAT+gn9nL4v/CP4xW2oW2s+FvDHhz4oCQjVbOexWH7axON0Qck7jjDR5yDnqOa+tbLwP4M01pjYeFPD1qZceYU0+P5sdM8e9fzSWPi/xZHrFlrdxHCkyOEN9DKf3pPIzkk9u9ftR+y/8e9O1b4P+EvDPi7VHTVbpJl0+8uZcrIscmxYix6cY2k+mPSuj6vh6sXUw6t3X6p9V66rzOWFeuqjp1NtWnfz2t897n11F4Q8Kwb/ACfDehx7xhsWUfI/KrsehaJEgWLRtKjUDAC2iD+laoIIyDkGiuQ6ygNK0tU2rpunhfQWyY/lU8VpawReXBbW8KZztjjCj8hViigCPyYv+eUf/fIpyqqnKqqn2GKdRQAm1d27A3euKX+LPf1oooAXJ9TSUUUAFFFFAH4fGKBCQFU45wacrhMLH8ueTmsk3G8kBywPG5l5pyzhBnBYj0zXycoPm5tvLvsZQvdqSOlt5GIADAsPvVsW9xICcHI781x8VyGK7SynqMjB+laltcsQAdw5xkGilGUI2k726df69Dm5b3RZ8baUniH4N+INJK+ZJPZuYiOodRuXH4rXw/4B1i60Px9pep208lvcWl0ssc0TlHRlOQykchh2PY197W1yfOHGQPXvXwJ4osW8MfGjX9M24jh1BjEM4AjY7l/RhXXSxElSutLNfczpw1Re8rp6H9IvhV/Cun39ldWV5cwT6/YQ3kH2vVpp/tm9QdwEjEbwNoz1IOO1ek18IfAr43fCrU/2dPhIviPxXoum+J9Chaxu7W+b94FCOqP05XiNgex+lfdNvcW93aJcWs8NzA4ykkTh1YeoI4NfRO+j7jhJtu7JqKK8z+KvxI0b4a/Cu/1bUbkLfSQulhbqRvkkwcHB/hBwSTThBydkW3ZHwD+2Z8cbs+Np/BGi6nK/hy0iSPU4IpMR3UwYswOPvBflXnIyp4r8hfGniC3uNSublp0hRnYqoAzjPTFeo/Fnx22p+IruaMyTO0jAvIc7jzya+NvEWpTyG4YTPuLfdIyBXo4im5x9nHRLTte/mcDqJS9f6/rYz9e1N7u6aGIOpb7rA+1cdJFNFI6NM7tkbs4G0Vl3896k37ucorDJAbnFctcpftNKxmJPo78t7VwSwajzqLs7bfmdUayjeTX6XO7m1C6it2FvY/ayP+Wnm56jkYFcfqWu6ltH+hvCpGPvfyrGbUtQsoTD5zRscZwcmsubUruVzl2I9Kinh3Fqbd+qdu3z/ryNVU5Y8rbNiPxDdh2O4rjoCM10+jeJJ7cTlpnYswyvYY7ivOAS8oO1j6/Wt+xtisamWRBkHcm/muuq6Ot3dSVn0/4b8Ec79pLaR9p/DDxfLq2hnS7x18hztj3nvjIr6a8N+KtQs5/DlnbSyQvp/mRxpv8AlIeQOCPbOfzr85PBGpSW3iuAeZMq4wMD5Vx0r6w8I6u9xFpcLTbrg3TxxuTyeWcfhxiuWlzUJurB2d/uMa1OTXI9VtfTyP32/Zl+NieJNEk8J61JM11bylLadyWYEAZRvbuCOBzX2bX4EeBfHa/DP9qJZri7vrfS5Zre8lS3kAl5UFgCeAclv0r9cvhP8ddF8eaVcm4ndGN0fsksiKrtEx+QOF4BGcZHBwPeuqslWiq0FurswwNb2N6NSW2x9C0Vxmp/EDwlo+uTabqOqi2vojhoTBIT7YwvP4Vmy/FbwPAoMusbGP8AAYWDflisY4aq7Wi/uPRlWgt2ei0V5hL8YfAcIy+qyj/t3aqknxt+H0b4Op3DH/Zg6frWiwVdq/I/uEsRTfU9aorxpvjt4EWRgJtQIHfyVGfzaqb/ALQPgRVJJ1An02Jn/wBCoWCrv7IPE011PcaK8GP7QvgsQbhDqBk/uZT/AOKqrJ+0b4NQDFpft65dRimsDWavb8V/mQsXSbsn+DPoOivnWT9pPwelyE/s+/K45YyKP/11Sb9pvwqtw6/2VeMg6ETrn8eKf1Cv2X3r/MtYiDV0flS1ySSF4Gc1It2Tgk445rBfUMsF8lNxHPPFM+3bH+7EBjmvzu6W39f1b8TTki1e51aXDEDp6jP8qv2135cpPOSeCD0ri49RJi8sRqvPBP8AStKLUMw42pn2611W96XN32vbzOeK1tY9AgvB5Kybxzx8vrXjvxI+FOoeM/H0Gu6Rf6fZl7dI7kXDOCWXOCNoOeCB26V3EGqttCsI8dsitq01U7EU7Rx1q41LRaTtr+A4RcZ8yPKdD+B3i60niZPEuiqqkfwy/wAsV9O+DtA+I+h2caWfjaKELwohMoA9sAjNc5YauVk++uT3xiu107WZkxtmdF6jBxXqYbHSprljUsvzM8RiJT1Z7lF8TfiX4c8JTX/iXx7p8Wj2kI8yb7B+9XHTBP3mPTBzmvzY/aF/aK1Xxz4vmmfULx9Nt18m0ieT5to6s3uTya9N/aT+I15p3wgsdHguZFu76YjIcnCDrx6nOK/LXxT4qia+Kj94+RGUL5y3OTX0uX05zjzSd2/RHFJynNdPUseIfFst5eyMXYnp1z+FeTatqdw7hfJZ0Bz82ck10lvGLuDzfs8jyMxPy9qy77T97sodpJN2V4zTnNTa5Vbpb+v1/wCCd9HBOMbJ6v8ADU84mvLmaSSMxhGDE5Izms64sJ7j5y7l+oPT8TXeS6dJmQQxo8in95u5x7U1NGnmjaRwOVGMDBJrmkq8bcm+1l5/Pb5nf9RdNc3T/M80urKGGN5C5eQDk4yTWWtrNOitHGR6HHWvX7XwfJc6htbfk9Qa318JpbBITD+9ZQASMbhV04ShScXq/Psu3qCw07PQ8HWxcyFSSGNblpos00i+Xuxgc55ya9ltfh/+9jM0ZDYydy1vW/hiOzTaY/mLZJCcAVjPFyUuWL3t/Wx6GGy13952/ryPONL0u6sZEKb5pT8oBONvNe6aQZtNi0a6efEkc6HBGeC2W/TNZNrpCx3HnONoJ68fWurh0qW+v4WmkCxRDeMDljXFWzCUnGT27230t/WgVcvcVyrr5HqHjTWv7R+Ll3fWk5aC4Imh+bIyRnH9Pwr6p/Zw+K02i+J7OG6kFxYlsSK/OzOOfce1fDmohbeK2uWLYjOcgZwM0/wB4zbQPiRbyCXdbF9pyeCpJr0MI41MNL3X7q2PmMwoTo1ve0v1P6YrXwn8PPF+g2PiObSo7t7mEHz0vZV3HHIO1xyKRvhd8MUO4eGLORz3N5MT/wCjK+XP2Vvipa634Y1bwXe3CtIYze2BLcoygBk/Ec8eh9a+kbjVBDOf3wZCTgjPNeXzyg3dv72jkqOrFpqV0XT8PPhsqZTwppef7zSyNn83NUm8F/D+NiF8KaKMcYMef5msyXXlBOw7cdCayJ9cbYfnA+h5pqTas5b+bMozqd2bsnhrwTGCI/DOiKPeAE1ny6N4TjQlNA0IEdxZp/hXOXGtdjIQD196xp9aLZ+fHtQ9Fq9i1OfRs6eay8ORt+60bR19cWqD8OlZE66Mhymm6Wvv9mX/AArk7jWssUEhx9awLnWCBtL4+pqZcul0a0/aN2bZ11zNpqZdLWw49LdR/SsG6vrNcssVuuBkARDmuPu9ZG1gr4I/Kufn1RmDAyA461MXGKszqgpSW9j4k+2Pu2tkE9waPtLtkFlwDjGMkVy/2kI/L9f1py3rBjsIbJyT3r5GU5upzU1Z/h/W23U9nlvDmO1huXK7QQxA4zVyG4bcP3kaDGT81cKt7vchjnjqTVuG8bhmkwR268Vp9Yj7R37f5/gYRpbpnfwysXUtKDHnhs1qQXBSUB51BPTJrzqO/YEFnDKBgYPStGHUCXUEkAcAZ612Oo1DV3TX+RnCDadj1O3vArr/AKQhx611mnagDIo84Fs8EV4pBflZAVVQCORmptZ8WLoXgm/vUOZliIgB7ueAB+NdOFV1ro3+Hmc7pzTvY+dP2lviHHeeINTaGX5bZPstowHQj7zexJz+Qr4h0C3utZ8VwAuZYVYuSev0rpPi14gudR8brpzszTQ4MpHTceuT61f+GOmbJ2uZd211wpPTGc5r7mpXp4XBtXtdfnp+m5z4CCnilzarXT+u56RFokVvpKM67Rt5ANZVzpsJKbUAIUkgd816JqULHTyoUjPb1GK5i4tiI027F3ElmzzXzLxajLmcmpSfn+h9rSppK1jkF0uJ7nyYUG0HLtjqa0P7Pt0kVQgYYwfSr/lyQKVUc45IPr61LAvmRNuC7s966KderVfNF3Wm779Wd0qblK32SgEP2cpGixdVZgvNalpaIbmN3USlBxnsasO6wDYkLTn0PSltnupGLGBrWJh8pYZNawlbS2mnX+uhMKTlHmjGyNCOJnb5zsGfmyMU5ovmd0+dSccdMU9oZFhBd9zjpg9ferC25FkioZmBYncOP8iuWq5S8vkaUKCleUiGCGJ5vLMSlc/Lz3roLe32SoBjg5Ax1rMihYonzqhQZzit22kVIyQ3zk8kd68arywUoq7a8v08/wCtDqnC22wzUrWCXTyhAIIOOMCvnvVy2n+KpfLkMeGyGB/zxX0hcKZrXcrZA55r5+8cQxjUGKptI6nvX0HDGJam0m7JdfO39fkfLZ7hIOgn9pXPtv8AZT+LKaP8ZfCV3JPsaK4NpdlmyGikG3J+hxzX643etLPKzxTqM8pjow7V/Nv8K/EM+ifFnTDuVVedQw6jGeo9x1/Cv3S0XXmPgjTB5yuXtkaKTOQwKjnPoetbZ1TVKqmup8fS/e0k3uetPrB3Mvn4P0rOl1b5WT7Q5IHevOZdbywbeADxWfJrPztmTJ7V5kq1lzR3NFCSR6BPqoGR5rE+/esmfVyZciQgDpk1wU2s7iwLcduaybjV+CRIeT0zWLqOb8/+GNoUW15Hcz6pgkmcgH0rFudTOWPm5A9T2rjJ9U2kBnxnrk1kTaoNjBW5HqeKxhiNea50Kim79jsZtQBZj5pbnPWsi51JS+zzCc9MHrmuSl1Zw3DoQRyB61lSahkFtxJHviidTkdzb2Et4nykl4pYP85yeFJz+tTLegcLuAPOA1c2JSAMghST0HX2p8UqgLvLD+7nt9a+efMnKc5Xg/P7vPz069FqevPlvY6o33YADj1qVb11IyVJI9elc0Lj58Fg4I3EjgVMk6tGMNj0qqc1Qi9Ltbef4af8A5lZbXsdPHdtgcrnH4VeTUJEbG9WwB1HWuSWcOqoPkA5ye9TRzkOMsWArpnKPI3fRX/MSpRTO6g1BwqlpA2RxxXIfEvVPsng6zjdxIHl3OSvAABP86niuSIuV7ZrivipKW+B17c9JoXRg56gEgY+nNXl2KdetGN9+/b/AIJnNKmnrY+GfFwluPiDO6TGQSSbnJ5zzXvfw/t1XTrVDnB6tng187anfeb4uufM+UKwBHqeOa+kfh+DN4ficHBCgkDsa+vzfFf7LGnbpv693bUMqiozlK33dj1HU7iN7Ubi29PuKo6e9cDPOXnYK52Z5VhXbanEF0vcWAHZh3rh1hW8mkXzAVyQMnArzcHB8/K9Y/c/u/p6n1FGahG8uncliUTtu8zcCvJHSr/2UBVdCWkOANo6VHFZ3EMqbJkWPb0B5P1rSX7hIdYsHtxXoeyhZWs/n6fj3Kp42N7dCKO1uVcudrKBhgw71cghlwA5Ai6Efzq18mxNjDaRnrzmq15fR2liuMM5cA89M1zyo1lpff0v9/8AWpSkpRbS/wAi5HCJJmc4A649RViSNzCDE2BjoAKr2t3CWXDqWZecfyqWa/tonzLNHGm7IBYZqHgHCChHpt2/P1NvaRptIihUmNon3mTOcsK1LeORSRsVvQjnNYj67pYnZ0uYvNUY+U8UW/imxNwIzKMjpg1zVk3CXLq+3mW661ff+tDrJoydNYxhVIGMV4h44tzwcZyegXqa9zieCbT1kjkBU8nuDXlfjy2VdMkkk+RuxB7e9LKq0Y12nJ6/1t/lsedi6UKlKSv3PBNLuHt9ejkicQ7JARgZ2kHjHtX7J/D/AMWNqnwG8H3LBIT/AGZGjAHkFeD+or8U5bk2l+/kt8wbcmDjPcV+pnwz137R8B/C7qqq/wBjHmFABzk9h+Ve3xFKXsoT5tE38tP18z4qlSUKjilp3PoptbXawL8jp2qk+trs3bjkdMHqK84bViZcYPTGM1WOpPliFGAeAT0r49VWoWfW3p6HaqEd10PQJtYwIySAQeOaz31VWYtuyvJIriZdRZzg7T+PNUG1ArIQT16L71lHGV+RpuzX+fz+Vzop4W+p2s2qluMkntzVBtTQbizMu0cD1rkpLxz3PPXBxxVV70gEFjjHBzzV0q0pxUl2/D+ulhezV3GW3kdS2ooHGGZVHXPaqzaiWZgwBBPymuXe9J3ZJx6GoWu8r8mBk8GuZ1qnNd3fl69fltvY2lRlez3R8+xyOYinmsdrfMCaf58jStkEoT+IrIeSVkO0ghiNxpbaYhnG5Nnr15rz6VJNW5tF5baXvtb1V9NjodJ8nM/8/v8Amb8cmIz3Y9KsRsQCBj5R3asRbiRIxgrn+EjtU4cHkvlmHBJ5PvWsKiTbnf1/Pz11M5wdkrm7HMWXaCoznOOlOikdc/vCRjrWKsh37DJjaOakZjsyzlkJ/L/69ZUa/NGXN9rVX69Vv20Y0mvdZ0sUkrSIsbE+wNQ+LdNu7n4LeIrW/tpxaPbGRJTEcB0G8AHv93pVCxnRLlXld1jQ8884/wAa9msPib53w91TwvNolldaXd2zQyRyqWJVhtyOeD3z616WExHJOOjSTWv42+X4Mwr0W4PVXPyF1Hc2t3NyvCs2CwPIPvX2X8KbBIfh3p91IoUypuwe/wDk189+MvA1xpHxAu9PDfIZd0fy4BzyK+qNGgXSPgzpMTq0TpZru57kcn8TX1+JqxqQhT5vuX69fQeXwtFy/pGH448TpbFra2KKASCueeleGX/ia6SI+TO4dhxtHaut157EI99cyIGy3LtwB6V4/qni3TliX7Nai4dDyAuFowGGm26kHa3W3Xt+BvKrFxV2rX/q5oTeMtaZ40tJ549owXJPB+tdBpHirXGmjiu5ZJozyZSckc15HPrtzqV2sf2eG2DsMeUcH0rTs9Z1DTrnZJIrbT/EQTXuU8FUpRSjFb9V+u+\/\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\/\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\nX-ABUID:8EB7851C-B20F-40EE-8587-05292BA16B69:ABPerson\nEND:VCARD';
console.log(vCard(data).cards.length);
buster.testCase("vCard core", {
	setUp: function () {
		this.vCard = vCard(data);
	},
    "Has a core function and a card": function () {
        assert.isFunction(vCard);
    },
    "can convert a vCard str to a vCard list": function () {
		assert(this.vCard.cards);
		assert(this.vCard.cards.length);
    }
});
buster.testCase("vCard Parsing", {
	setUp: function () {
		this.vCard = vCard(data);
	},
	"can read details from a vCard": function(){
		var item = this.vCard.data[0];
		assert.isObject(item);
		assert(item.name);

	}
});