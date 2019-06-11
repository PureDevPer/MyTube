# res.locals
- https://expressjs.com/en/4x/api.html#res.locals
- An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). Otherwise, this property is identical to app.locals.

This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
```
app.use(function (req, res, next) {
res.locals.user = req.user
res.locals.authenticated = !req.user.anonymous
next()
})
```

# res.render
- https://expressjs.com/en/4x/api.html#res.render
Renders a view and sends the rendered HTML string to the client. Optional parameters:

locals, an object whose properties define local variables for the view.
callback, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes next(err) internally.
The view argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the views setting. If the path does not contain a file extension, then the view engine setting determines the file extension. If the path does contain a file extension, then Express will load the module for the specified template engine (via require()) and render it using the loaded module’s __express function.

For more information, see Using template engines with Express.

**NOTE:** The view argument performs file system operations like reading a file from disk and evaluating Node.js modules, and as so for security reasons should not contain input from the end-user.
```
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {
// ...
})
```

# res.sender
- https://expressjs.com/en/4x/api.html#res.send
Sends the HTTP response.

The body parameter can be a Buffer object, a **String**, an object, or an **Array**. For example:
```
res.send(Buffer.from('whoop'))
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })
```

This method performs many useful tasks for simple non-streaming responses: For example, it automatically assigns the **Content-Length** HTTP response header field (unless previously defined) and provides automatic HEAD and HTTP cache freshness support.

When the parameter is a **Buffer** object, the method sets the **Content-Type** response header field to “application/octet-stream”, unless previously defined as shown below:
```
res.set('Content-Type', 'text/html')
res.send(Buffer.from('<p>some html</p>'))
```
When the parameter is a **String**, the method sets the **Content-Type** to “text/html”:
```
res.send('<p>some html</p>')
```
When the parameter is an **Array** or Object, Express responds with the JSON representation:
```
res.send({ user: 'tobi' })
res.send([1, 2, 3])
```
