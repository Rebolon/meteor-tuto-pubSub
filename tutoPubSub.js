var Datas = new Meteor.Collection('Datas');
// Datas.remove({});

if (Meteor.isClient) {
  Session.setDefault('limit', 1);
  Meteor.autorun(function funcAutoRunOnClient() {
    Meteor.subscribe('getMyData', Session.get('limit'));
  });

  Template.datas.list = function () {
    return Datas.find();
  };

  Template.datas.clickCounter = function () {
    return Session.get('limit');
  };

  Template.datas.events({
    'click input' : function () {
        Session.set('limit', parseInt(Session.get('limit')) + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Datas.find().count() === 0) {
      var dataToInsert = {value: 1};
      for (var i=0; i<50; i++) {
console.log(dataToInsert);
        Datas.insert(dataToInsert);
	dataToInsert.value += 1;
      }
    }

    console.log('nb item in Datas: ', Datas.find().count());
  });

  Meteor.publish('getMyData', function funcPubGetMyData(limit) {
      limit = limit || 1; 
      var list = Datas.find({}, {sort: {value: 1}, limit: limit});
console.log(list.count());
      return list;
  });
}
