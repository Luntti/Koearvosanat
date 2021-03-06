<!DOCTYPE html>
<html>
	<head>
		<title>Arvosana</title>
		
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=Edge" />

		<link href="https://rawgithub.com/nathansmith/unsemantic/master/assets/stylesheets/unsemantic-grid-responsive.css" rel="stylesheet" />
		<link href="http://rawgithub.com/Petja/PetjaUI/master/main.css" rel="stylesheet" />
		<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet" />
		<link href="http://fonts.googleapis.com/css?family=Lobster|Droid+Sans:400,700" rel="stylesheet" />
		<link href="css/main.css" rel="stylesheet" />
		
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="http://rawgithub.com/Petja/PetjaUI/master/main.js"></script>
		<script src="js/main.js"></script>
	</head>
	<body>
		<div id="modalContainer" class="hidden">
			<div class="modal" id="asteikkoModal" style="text-align:left">
				<h2>Arvosteluasteikko</h2>
				<p>Valitse arvioinnissa käytettävä arvosana-asteikko</p>
				<p id="asteikot"></p>
				<div class="buttonDock" style="text-align:right">
					<a href="javascript:void(0)" id="vahvistaAsteikko" class="but colored orange">Valitse</a>
				</div>
			</div>
			<div class="modal" id="rajaModal" style="text-align:left">
				<h2>Läpäisyraja</h2>
				<p>Määritä kokeen vähimmäispistemäärä</p>
				<br />
				<p style="text-align:center;">
					<input type="number" value="0" size="3" min="0" max="100" id="rajaPro" /> % &emsp; &asymp; &emsp;
					<input type="number" value="0" size="3" min="0" max="250" id="rajaPst" /> pst.
				</p>
				<br />
				<div class="buttonDock" style="text-align:right">
					<a href="javascript:void(0)" id="vahvistaRaja" class="but colored orange">Valitse</a>
				</div>
			</div>
		</div>
		
		<div class="fixedWidth" id="keskiosa">
			<br /><br /><h1>Koe&shy;arvo&shy;sanat</h1><br /><br />
			
			<div class="grid-container" id="asetukset">
				<div class="grid-33" id="maxValinta" class="asetus">
					<b>Max. pisteet</b><br />
					<span>24 pst.</span>
				</div>
				<div class="grid-33" id="asteikonValinta" class="asetus">
					<b>Arvosteluasteikko</b><br />
					<span>Peruskoulu ja lukio</span>
				</div>
				<div class="grid-33" id="rajaValinta" class="asetus">
					<b>Läpäisyraja</b><br />
					<span>30 %</span>
				</div>
				<div class="grid-50">
					<br /><br />
					<b>Arvosanavaatimukset</b>
					<br /><br />
					<table id="palaute" cellspacing="0" cellpadding="8"></table>
					<br /><br />
				</div>
				<div class="grid-50">
					<br /><br />
					<b>Arvosanatilastot</b>
					<br /><br />
					<table cellspacing="0" cellpadding="8">
						<tr class="odd"><td>Keskiarvo</td><td id="keskiarvo">&mdash;</td></tr>
						<tr><td>Osallistujat</td><td id="osallistujat">&mdash;</td></tr>
					</table>
					<br /><br />
				</div>
			</div>
			<div class="grid-100">
				<hr /><br />
			</div>
			<div class="grid-50 hide-on-mobile">
				<h1 style="font-size:150%;text-align:left;">Kouluarvosanat</h1>
				<br /><br />
			</div>
			<div class="grid-50 mobile-grid-100">
				<small><b>Koearvosanat</b> laskee kokeidesi arvosanat helposti. Ohjelma on <a href="http://choosealicense.com/licenses/gpl-v2/">GPL-lisensoitu</a> vapaan lähdekoodin ohjelma.</small>
				<br /><br />
				<a href="https://github.com/Luntti/Koearvosanat"><b class="fa fa-github"></b>&emsp;Github</a> &emsp;&emsp;
				<a href="https://github.com/Luntti/Koearvosanat/fork"><b class="fa fa-code-fork"></b>&emsp;Forkkaa</a> &emsp;&emsp;
				<a href="https://github.com/Luntti/Koearvosanat/graphs/contributors"><b class="fa fa-users"></b>&emsp;Tekijät</a>
				<br /><br />
			</div>
		</div>
	</body>
</html>
