(function(){
	var language	=	document.createElement('div'),
		con			=	document.getElementById('language');
	language.className 	=	'languageDown';
	language.innerHTML	=	'<a>EN</a><a>CH</a>';

	con.appendChild(language);

	con.ontouchstart = function(){
		if( language.getAttribute('isShow') == "show" ){
			language.style.display	=	'none';
			language.setAttribute('isShow','hide');
		}
		else{
			language.style.display	=	'block';
			language.setAttribute('isShow','show');
		}
	};
})()