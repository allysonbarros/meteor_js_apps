var lists = new Meteor.Collection("Lists");

if (Meteor.isClient) {
  Template.categories.lists = function() {
    return lists.find({}, {sort: {Category: 1}});
  };

  Session.set('adding_category', false);

  Template.categories.new_cat = function() {
  	return Session.equals('adding_category', true);
  };

  Template.categories.events({
  	'click #btnNewCat': function(e, t) {
  		Session.set('adding_category', true);

  		Meteor.flush();
  		focusText(t.find("#add-category"));
  	}, 'keyup #add-category': function (e,t) {
			if (e.which === 13) {
				var catVal = String(e.target.value || "");
				if (catVal) {
					lists.insert({Category:catVal});
					Session.set('adding_category', false);
				}
			}
		},
			'focusout #add-category': function(e,t){
			Session.set('adding_category',false);
		}
  });

  function focusText(i) {
		i.focus();
		i.select();
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
