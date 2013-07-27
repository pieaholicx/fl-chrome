(function() {
	var storage = chrome.storage.local;
	var $autofill = null;
	var $save = null;
	var convo = false;
	
	function autofill() {
		storage.get('autofill', function(i) {
			var auto = i.autofill;
			if(convo)
			{
				$('input#subject').val(auto.subj);
				$('textarea#body').val(auto.msg);
			}
			/*else
			{
				$('form.what_you_type textarea[name="text"]').val(auto.msg).keyup();
			}*/
		});
	}
	
	function saveData() {
		storage.get('autofill', function(i) {
			var old = i.autofill;
			var subj = null;
			var msg = null;
			if(convo)
			{
				subj = $('input#subject').val();
				msg = $('textarea#body').val();
			}
			else
			{
				subj = old.subj;
				msg = $('form.what_you_type textarea[name="text"]').val();
			}
			console.log(old);
			console.log(subj);
			console.log(msg);
			storage.set({
				'autofill': {
					'subj': subj,
					'msg' : msg
				}
			}, function() {
				alert('Message Saved');
			});
		});
	}
	
	$(document).ready(function() {
		convo = (window.location.pathname.indexOf('conversation') > -1);
		$save = $('<button type="button">Save Data</button>').css('margin-left', '100px').click(saveData);
		$autofill = $('<button type="button">Autofill</button>').click(autofill);
		if(convo)
		{
			$('fieldset table tbody tr:first td').append($autofill);
			$('#submit_button').append($save);
		}
		else
		{
			//$('div#formatting_playground div.span-11:first h4').append($autofill);
			$('form.what_you_type input:submit').after($save);
		}
	});
})();