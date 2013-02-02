function(doc) {
  if (doc._id.substr(0, 5) === "item:") {
    emit(doc._id.substr(0, 4),{
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