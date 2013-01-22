function(doc) {
  if (doc._id.substr(0, 18) === "item:entertainment") {
    emit(doc._id.substr(0,18),{
    	"category":doc.category,
    	"type":doc.type,
    	"name":doc.name,
    	"quantity":doc.quantity,
    	"usage":doc.usage,
    	"condition":doc.condition,
    	"status":doc.status,
    	"notes":doc.notes,   	
    });
  }
};