Learnings = new Mongo.Collection("learnings");

if (Meteor.isClient) {

  Template.addlearning.events({
    "submit .new-learning": function(event){

      console.log("adding entry...");
      var insert_id = Learnings.insert({
        consumption_type:event.target.consumption_type.value,
        consumption_date:new Date(), 
        resource_uri:event.target.resource_uri.value,
        resource_name:event.target.resource_name.value,
        rating:event.target.rating.value,
        tags:event.target.tags.value,
        added_date:new Date()
      });

      console.log("inserted... id " + insert_id);
      event.target.consumption_type.value = "";
      event.target.resource_uri.value = "";
      event.target.resource_name.value = "";
      event.target.rating.value = "";
      event.target.tags.value = "";

      return false
    }
  });

  Template.learnings.helpers({
    learnings: function (){
      return Learnings.find({}, {sort:{consumed_on:1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
