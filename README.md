# Quotes Generator
#### Video Demo:  
<https://youtu.be/wZGHz-jTouE>
#### Description: 
This web app represents a simple interface to interact with [quotable api](https://github.com/lukePeavey/quotable) for filtering quotes according to their category and/or author, displaying them and the ability to download them.

**This web app is hosted on github pages** <https://aya-m-72.github.io/quotes-generator/>

#### Interface:
- selecting a category:
    - if not specified, it's going to be random.
    - next to each category a number represents the number of quotes available in that category.

- selecting an author:
    - if not specified, it's going to be random.

- selecting number of quotes to be fetched:
    - from 1-50
    - 5 by default 

- fetch button:
    - to fetch according to the above filters

- clear viewer button:
    - to clear the viewer from fetched quotes with preserving the filters.

- refresh button:
    - to clear the viewer from fetched quotes and to clear the filters, in other words, refresh the window.

- remove / check buttons:
    - next to each quote.
    - clicking remove will remove the corresponding quote from the viewer.
    - clicking check will preserve that quote for downloading next.

- download button:
    - if there isn't any quote checked will download all the quotes displayed on the viewer. Otherwise, it downloads the checked one(s).