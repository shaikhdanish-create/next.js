                 
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


# Create a 5x5 matrix with values 1,2,3,4 just below the diagonal

import numpy as np

arr = np.diag([1, 2, 3, 4], k=-1)

print(arr)
  
                                       
                                                    
                                   

