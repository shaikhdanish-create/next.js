                 
next project coming soon                     
import pandas as pd  

data = {
    "Name": ["Danish", "Rahul", "Danish", "Aman"],  
    "Age": [18, 19, 18, 20]
}  

df = pd.DataFrame(data)

print("Before removing duplicates:")
print(df)

df.drop_duplicates(inplace=True)  

print("\nAfter removing duplicates:")
print(df)   
                  
  
                                       
                                                    
                                   

