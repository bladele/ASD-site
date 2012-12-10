function(doc) {
  if (doc._id.substr(0, 8) === "item:ent") {
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