// ﻿Updated 2018-2019: Μαριάνθη Γριζιώτη margrizioti@gmail.com﻿
//	thomas.d.papadopoulos@gmail.com

function readModel()
{

	// TEXT DATA

	titleText = 'Πρότυπο κυβόκοσμου: Grid';

	problemText = 'Αυτός είναι ενας κενός μικρόκοσμος (πρότυπο) τον οποιό μπορείς να επεξεργαστείς ακολουθώντας τις οδηγίες. ' +
		' Παράδειγμα εκφώνησης:'+
	'"Ο μηχανικός έδωσε σε ένα οικοδόμο το παραπάνω σχέδιο μιας αυλής, που δείχνει πόσα τούβλα θα πρέπει να τοποθετήσει ο χτίστης ' +
	'σε κάθε θέση, για να φτιάξει την περίμετρο της αυλής, τραπέζι και πάγκους. Ο οικοδόμος έφτιαξε το ένα μέρος του τοίχου και πρέπει να τοποθετήσει και τα υπόλοιπα τούβλα. ' +
	' Μπορείτε να ολοκληρώσετε την κατασκευή;"'

	authorText = 'Φακούδης Βαγγέλης - Λάτση Μαρία - Updated 2018-2019: Μαριάνθη Γριζιώτη';


	// last update

	// COLORS
	// Must always be 10 color hex values. The first one (index 0) is for internal use. You may change indices 1 .. 9.

	colors = [ 0x000000, 0xDF1F1F, 0xDFAF1F, 0x80DF1F, 0x006633, 0x1FDFDF, 0x1F4FDF, 0x7F1FDF, 0xDF1FAF, 0x000000 ];

	wireFrame = true;

	// end of last update


	// DIMENSIONING

	gridDimension = 500;
	cubeDimension = 50;	// this must be constant
	gridDensity = Math.floor( gridDimension / cubeDimension );

	// altered 8.6.13

	// COUNTERS

	init_show	= true;	// show number of blocks added by author
	usr_show	= true;	// show number of blocks added by user
	rare_show	= true;	// show number of blocks added by author, but deleted by user
	tot_show	= true;	// show total number of blocks currently in canvas

	// end of 8.6.13


	// HEIGHTS TABLE

	heightsTable =
	[
		[3,4,5,6,7,7,6,5,4,3],
		[2,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,1,1,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,2],
		[2,0,1,0,2,2,0,1,0,2],
		[2,0,1,0,2,2,0,1,0,2],
		[2,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,1,1,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,2],
		[2,1,1,1,1,1,1,1,1,2]
	];

	// CANVAS DATA: 1 .. 9  for colorful cubes, 0 for empty space. Number of rows, columns and towers height must be equal to gridDensity.

	canvasGeometry =
	[
		[
			[1,1,1,0,0,0,0,0,0,0],
			[1,1,1,1,0,0,0,0,0,0],
			[1,1,1,1,1,0,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,1,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		]
	];

}
