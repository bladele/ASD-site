function(doc) {
  if (doc._id.substr(0, 12) === "item:vehicle") {
    emit(doc._id,{
    	"catgry":doc.catgry,
    	"type":doc.type,
    	"name":doc.name,
    	"quantity":doc.quantity,
    	"usage":doc.usage,
    	"condition":doc.condition,
    	"status":doc.status,
    	"notes":doc.notes,   	
    }
    );
  }
};