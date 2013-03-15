var lists = new Meteor.Collection("Lists");

if (Meteor.isClient) {
  Template.categories.lists = function() {
    return lists.find({}, {sort: {Category: 1}});
  };

  Template.list.items = function() {
  	if (Session.equals('current_list', null))
  		return null;
  	else {
  		var cats = lists.findOne({_id:Session.get('current_list')});
  		if (cats && cats.items) {
  			for (var i = 0; i < cats.items.lenght; i++) {
  				var d = cats.items[i];
  				d.Lendee = d.LentTo ? d.LentoTo : "free";
  				d.LendClass = d.LentTo ? : "label-important" : "label-success";
  			};

  			return cats.items;
  		}
  	}
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
