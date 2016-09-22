# Sharing your project

Once you've made your project, you can save it the cloud, share it, or embed it on another website.

* Click **More...**, then **Embed Project**:

![Asks to embed](/static/embed/publish.png)

* Click **Publish project**. This will make the project publicly available
* You will then see this information:

![Embedding information](/static/embed/embed-info.png)

## Sharing the URL

You can share the URL for the project ([https://codethemicrobit.com/httuftrbtg](https://codethemicrobit.com/httuftrbtg) above) with other people, and they will be able to visit that page to see your project, download it, or edit it:

![Project page](/static/embed/project-page.png)

## Embedding into a blog or web site

Rather than just sharing the link, you can also embed the project so that your visitors can use the simulator, edit blocks or code, or download the project without having to leave your site.

### General instructions

* Copy the HTML for embedding the page from the publish dialog. It will look like the following:

```html
<div class="ui card sim"><div class="ui content"><div style="position:relative;height:0;padding-bottom:70%;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://codethemicrobit.com/?sandbox=1#pub:httuftrbtg" allowfullscreen="allowfullscreen" frameborder="0"></iframe></div></div></div>
```

* Open the HTML editor for your blog or website and paste it with your content

### Wordpress

[wordpress.com][] blogs do not support embedding content from most websites, so you will need to link to your project instead. Alternatively, if you have a Wordpress VIP account you can follow [these instructions][wordpress-vip] to embed an `iframe` into your blog. The URL that you need to add is like `https://codethemicrobit.com/?sandbox=1#pub:httuftrbtg`, but replace `httuftrbtg` with your project's unique identifier.

If you self host a Wordpress blog you can install the [iframe-plugin][] and then write the following in your blog-post (again, replacing the `httuftrbtg` with your project's identifier):

```
[iframe src="https://codethemicrobit.com/?sandbox=1#pub:httuftrbtg"]
```

### Embedding in Markdown documents

[Markdown][] is a popular text format supported by many blog editors. As Markdown supports embedded HTML, you should be able to paste the HTML into the document, although some sites may prevent you from doing this.

### ~hint

**Developers:** This page supports OEmbed as well 

### ~
[wordpress.com]: https://wordpress.com
[wordpress-vip]: https://vip.wordpress.com/documentation/embedding-rich-media-from-around-the-web-with-protected-embeds/#scripts-iframes-and-objects
[iframe-plugin]: https://wordpress.org/plugins/iframe/
[Markdown]: https://daringfireball.net/projects/markdown/