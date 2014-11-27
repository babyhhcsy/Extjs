
Ext.override(Ext.form.RadioGroup, {   
		    getName: function(){   
		        return this.items.first().name;   
		    },   
		    getValue: function(){   
		        var v;   
		        if (this.rendered) {   
		            this.items.each(function(item){   
		                if (!item.getValue())    
		                    return true;   
		                v = item.getRawValue();   
		                return false;   
		            });   
		        }   
		        else {   
		            for (var k in this.items) {   
		                if (this.items[k].checked) {   
		                    v = this.items[k].inputValue;   
		                    break;   
		                }   
		            }   
		        }   
		        return v;   
		    },  
		    setValue : function(value){　　
		　　　　　　　 this.items.each(function(f){　
			               var index=-1;
			               try{
			                 index=value.indexOf(f.inputValue);　 
			               }catch(e){}
		　　　　　　　　　　　 if( index!= -1){　　 
		　　　　　　　　　　　　　　　 f.setValue(true);　　 
		　　　　　　　　　　　 }else{　　 
		　　　　　　　　　　　　　　　 f.setValue(false);　　 
		　　　　　　　　　　　 }　　 
		　　　　　　　 });　　 
		　　} 
}); 