(function($){
	$("a.stylify").click(function(e){
		e.preventDefault();
		$("select.cool-it").QuickSelect({
			openEffect: function(instance){
				$(this).slideDown(200);
			},
			closeEffect: function(instance){
				$(this).slideUp(200);
			}
		});
	})
})(jQuery)
