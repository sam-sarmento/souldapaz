function seeMore(){
	var objTextMore = $(this).closest(".caption").find(".textMore");
	$(this).closest(".thumbContainer").find(".textMore").not(objTextMore).hide();
	objTextMore.slideToggle();
}

function openLyrics(){
	var lang = $(this).data("lang");
	var objMyLyrics = $(this).closest(".caption").find(".letra");
	$(this).closest(".thumbContainer").find(".letra").not(objMyLyrics).hide();
	
	if (!objMyLyrics.is(":visible") || objMyLyrics.data("lang") != lang) {
	
		if (objMyLyrics.is(":visible")) {
			objMyLyrics.hide();
		}
		
		$.ajax({
	        url : "content/lyrics/" + lang + "/" + objMyLyrics.data("music") + ".html",
	        dataType: "text",
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        success : function (data) {
	        	objMyLyrics.html(data);
	        	objMyLyrics.slideDown();
	        	objMyLyrics.data("lang", lang);
	        }
	    });
	
	}
	else {
		objMyLyrics.slideUp();
		objMyLyrics.data("lang", "none");
	}
	
	
	
}

function createPhotoModal(){
    $('#photoContainer').on('click', '.row img',function(){
        var src = $(this).attr('src');
        var title = $(this).attr('title');
        var img = '<img src="' + src + '" class="img-responsive"/>';
        $('#myModal').modal();
        $('#myModal').on('shown.bs.modal', function(){
            $('#myModal .modal-body').html(img);
            $('#myModal .textoFotoModal').text(title);
        });
        $('#myModal').on('hidden.bs.modal', function(){
            $('#myModal .modal-body').html('');
            $('#myModal .textoFotoModal').text('');
        });
   });  

}

function exibeDetalheAgenda(){
	var objDetalheAgenda = $(this).closest(".agenda").find(".agendaDados");
	$(".agendaDados").not(objDetalheAgenda).hide();
	objDetalheAgenda.slideToggle();
}

function montaAgenda(){
	$(".agendaSaibaMais").on("click", exibeDetalheAgenda);
}

function contentLoaded(){
	$(".thumbContainer").on("click", ".seeMore", seeMore);
	$(".languages").on("click", "span", openLyrics);
	createPhotoModal();
	montaAgenda();
}

function onMainNavClick() {
	$("#mainNavTab").find("li").removeClass("active");
	var liObj = $(this).closest("li"); 
	liObj.addClass("active");
	var contentBoxObj = $("#contentBox");
	contentBoxObj.empty();
	
	
	
	$.ajax({
        url : "content/" + liObj.data("content"),
        dataType: "text",
        //context: document.body,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success : function (data) {
            contentBoxObj.html(data);
            contentLoaded();
        }
    });
	
}


$(document).ready(function (){
	$("#mainNavTab").on("click", "a", onMainNavClick);
	onMainNavClick.call($("#mainNavTab").find("li").first());
	

	
	
});



