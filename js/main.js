n = 0;
asteikot = [
	["Peruskoulu ja lukio",["4|Hylätty","4+|","4½|"],["5-|Välttävä","5|","5+|","5½|","6-|Kohtalainen","6|","6+|","6½|","7-|Tyydyttävä","7|","7+|","7½|","8-|Hyvä","8|","8+|","8½|","9-|Kiitettävä","9|","9+|","9½|","10-|Erinomainen","10|"]],
	["PK ja lukio (kok.luvut)",["4|Hylätty"],["5|Välttävä","6|Kohtalainen","7|Tyydyttävä","8|Hyvä","9|Kiitettävä","10|Erinomainen"]],
	["Ammattioppilaitos",["HYL|Hylätty"],["T1|Tyydyttävä","H2|Hyvä","K3|Kiitettävä"]],
	["Korkeakoulu",["0|Hylätty"],["1|Välttävä","2|Tyydyttävä","3|Hyvä","4|Kiitettävä","5|Erinomainen"]],
	["Ylioppilastutkinto",["I=|Improbatur =","I-|Improbatur -","I|Improbatur","I+|Improbatur +"],["A|Approbatur","B|Lubenter approbatur","C|Cum laude approbatur","M|Magna cum laude approbatur","E|Eximia cum laude approbatur","L|Laudatur"]],
	["0 - 10",["0|Nolla"],["1|Yksi","2|Kaksi","3|Kolme","4|Neljä","5|Viisi","6|Kuusi","7|Seitsemän","8|Kahdeksan","9|Yhdeksän","10|Kymmenen"]]
];

vaatimus = 0.3;
maks = 24;
odd = "";
pisteet = 0;
osallistujat = 0;

function seepra(){
	if(odd == ""){
		odd = " odd";
	}else{
		odd = "";
	}
}

arvosanaData = [];

function laske(){
	odd = " odd";

	$("#palaute").html("<tr class=\"odd\"><th colspan=\"2\">Arvosana</th><th>Pst.</th><th>%</th></tr>");
	
	var raja = maks * vaatimus;
	
	var arvosanat = {};
	var asteikko = asteikot[n][2];
	
	var hylArvosanat = {};
	var hylAsteikko = asteikot[n][1];
	
	// Luo lista pistevaatimuksista
	for(i = 0; i < maks; i = i + 0.5){
		var pro = i / maks * 100;

		if(i < raja){
			var hyl = Math.min(1,Math.max(0,i/raja));
			var hylArvosana = Math.floor(hylAsteikko.length*hyl);
			if(hylArvosanat[hylArvosana] == void(0)){
				seepra();
				hylArvosanat[hylArvosana] = i;
				$("#palaute").append("<tr data-arvosana=\"" + hylArvosana + "\" class=\"hyl" + odd + "\" id=\"rivi" + hylArvosana + "\"><td>" + hylAsteikko[hylArvosana].replace("|","</td><td>") + "</td><td>" + i.toFixed(1) + "</td><td> " + pro.toFixed(1) + "</td></tr>\n");
			}
		}else{
			var arvo = Math.min(1,Math.max(0,(i - raja) / (maks - raja)));
			var arvosana = Math.floor(asteikko.length*arvo);
			if(arvosanat[arvosana] == void(0)){
				seepra();
				arvosanat[arvosana] = i;
				$("#palaute").append("<tr data-arvosana=\"" + (hylAsteikko.length + arvosana) + "\" class=\"" + odd + "\" id=\"rivi" + (hylAsteikko.length + arvosana) + "\"><td>" + asteikko[arvosana].replace("|","</td><td>") + "</td><td>" + i.toFixed(1) + "</td><td>" + pro.toFixed(1) + "</td></tr>\n");
			}
		}
	}
	
	$("#maxValinta span").html(maks + " pst.");
	$("#asteikonValinta span").html(asteikot[n][0]);
	$("#rajaValinta span").html((vaatimus*100).toFixed(2) + " %");
	
	var vaatimusUrl = Math.round(vaatimus * 100);
	if(vaatimus * 100 % 1){
		var vaatimusUrl = (vaatimus * 100).toFixed(2);
	}
	
	// Aseta URL
	history.replaceState(void(0),void(0),"?" + [maks,vaatimusUrl,n,pisteet,osallistujat].join("-"));
	
	// Määritä klikki-eventti
	$("#palaute tr").unbind("click").bind("click",function(){
		pisteet += $(this).data("arvosana");
		osallistujat += 1;
		laske();
	});
	
	// Laske keskiarvo
	var keskiarvo = pisteet / osallistujat;
	var yhdistetty = asteikot[n][1].concat(asteikot[n][2]);
	
	// Kirjoita kokeen tiedot taulukkoon
	$("#keskiarvo").html((yhdistetty[Math.round(keskiarvo)] || yhdistetty[0]).split("|").join(" (") + ")");
	$("#osallistujat").html(osallistujat);
}

$(function(){
	// Luo napit asteikon valinta modaaliin
	$.each(asteikot,function(k,v){
		$("#asteikot").append("<label><input type=\"radio\" name=\"asteikko\" id=\"ast" + k + "\" value=\"" + k + "\" /> " + v[0] + "</label><br />");
	});
	
	$("#ast" + n).prop("checked",true);

	// Avaa asteikon valinta modaali
	$("#asteikonValinta").click(function(){
		petjaUI.modals.show("asteikko");
	});
	
	// Ota käyttöön valittu asteikko
	$("#vahvistaAsteikko").click(function(){
		petjaUI.modals.close('asteikko')
		if(osallistujat > 0 || pisteet > 0){
			if(!confirm("Jos vaihdat arvosteluasteikkoa, antamasi arvosanat poistetaan.\n\nJatketaanko?")){
				return false;
			}
		}
		
		arvosanaData = [];
		osallistujat = 0;
		pisteet = 0;
		var yhdistetty = asteikot[n][1].concat(asteikot[n][2]);
		$.each(yhdistetty,function(k,v){
			arvosanaData[k] = 0;
		});
		
		n = $("input[name=asteikko]:checked").val();
		
		$("#asteikonValinta span").html(asteikot[n][0]);
		laske();
	});
	
	$("#maxValinta").click(function(){
		var val = prompt("Max. pisteet",maks);
		if(val !== null){
			maks = parseFloat(val);
			laske();
		}
	});
	$("#rajaValinta").click(function(){
		var val = prompt("Läpäisyraja",vaatimus*100);
		if(val !== null){
			vaatimus = parseFloat(val) / 100;
			laske();
		}
	});
	
	// Tsekkaa onko GET-parametrit olemassa
	if(location.search.trim() !== "" && location.search.trim() !== "?"){
		// Hae GET-parametrit
		var GET = location.search;
		
		// Poista kysymysmerkki mikäli se esiintyy parametrissa
		if(GET.substr(0,1) == "?"){
			GET = GET.substr(1);
		}
		
		// Jaa parametri viivojen kohdalta
		var parsi = GET.trim().split("-");
		
		// Aseta muuttujat parametrien perusteella
		maks			= parseFloat(parsi[0]);
		vaatimus		= parseFloat(parsi[1]) / 100;
		n				= parseInt(parsi[2]);
		pisteet			= parseInt(parsi[3]);
		osallistujat	= parseInt(parsi[4]);
	}
	laske();
});
