---
title: Flexbox and Foundation 6 Grid
category: Article
tags: [CSS, RWD, Foundation, Flexbox]
---

[Zurb](http://zurb.com/) has proven once again that Foundation is the most advanced framework out there. In their upcoming release of [Foundation 6](http://foundation.zurb.com/) they are moving to a flexbox based grid that focuses on making it easier to build the web apps of the future.

They have posted a [blog article detailing their decision](http://zurb.com/article/1333/foundation-a-new-grid). A possible downside to the change is that the flexbox grid will only work in IE10+. I'm not aware of any polyfills for the new flexbox model so I don't think support for IE8 and IE9 are possible. Maybe someone will come up with a clever approach to supporting older browsers. So far I've only come across [Using Flexbox Now](http://designkarma.co.uk/blog/using-flexbox-now) which talks about using IE conditional comments to provide selectors for targeting old IE versions using a float fallback and [Flexbox with Fallback](http://css-tricks.com/forums/topic/flexbox-with-fallback/) which uses a similar approach but instead depends on Modernizr classes `.flexbox` and `.no-flexbox` and breaks each grid into it's own Sass partial which I really like. My preference would be to use Modernizr classes and the creation of two separate grid systems; one based on flexbox and another using floats. It adds a level of complexity to the project but it should be fairly straight forward to build the site out as long as you're considering both grid systems as you're building out the pages.

Let me know if you have experience with flexbox and providing support for IE8/9 and how you go about it because I'd love to incorporate it into my own workflow.

Related articles:

* [Using Flexbox](http://css-tricks.com/using-flexbox/) by Chris Coyier
* [A Complete Guide to Using Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) by Chris Coyier
* [Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) on MDN
* [Flexible Box Layout Module](http://caniuse.com/flexbox) on CanIUse.com
