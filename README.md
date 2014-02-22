QuickSelect
=================

A *Quick* replacement for the good old *Select* tags.

Why I built this plugin?
------------------

This should be useful if you need to style some select box, without having extra headaches to worry about.

I hope you like this!

Why should you use this instead of another plugin?
-------------------------------------------

* I try to keep this as small and lightweight as possible.
* I keep this as responsive as possible.
* It works with events tied to the original select box.
* It let's you stylize almost the entire selectbox layout.
 
Optional parameters
-------------------

QuickSelect supports optional parameters.

### iconUp
The icon that will be displayed when the dropdown is visible.  
**Default: "&#9650;"**

### iconDown
The icon that will be displayed when the dropdown is not visible.  
**Default: "&#9660;"**

### minElemsBeforeGoingUp
This is the minimun number of options to display below the select box before trying to display it above the box. (You'll get this better if you play with it yourself.)
**Default: 3**

How to Use
----------

If you don't want to write any extra JS code, just add the *quick-select* class to your select box, and the plugin will automatically initialize.


If you have something like this in your HTML.
```html
<select id="myCoolSelect" name="data">
	<option value="1">This is an option</option>
	<option value="2">And this is another</option>
	<option value="3">Here comes the boom</option>
	<option value="4">Kaboom!</option>
</select>
```

Just do this with jQuery and you'll be good to go.
```javascript
$('#myCoolSelect').QuickSelect();
```

Maybe using some FontAwesome icons as an option?
```javascript
$('#myCoolSelect').QuickSelect({
	iconDown: '<i class="icon-collapse"></i>',
	iconUp:'<i class="icon-collapse-top"></i>'
});
```

IE Support
----------

I haven't tested this on IE, but should work from IE8 and up. I'll update this later.

License
-------

The MIT License (MIT) Copyright (c) 2014 Matias Saggiorato.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**It means, you can freely fork and modify this project for commercial or non-comercial use!**