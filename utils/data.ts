const markdown = `
*emphasis*
A paragraph with and **strong importance**.

> A block quote with ~strikethrough~  ~~Hello~~ and a URL: [React](https://reactjs.org).

* Lists
* [ ] todo
* [x] done

A table:

| c | d |
| --- | --- |
| fs | gd |

\` Hello \` Bye this is fun

<h1 style="font-size: 20px; color: blue;">Hello</h1>
<h2>Bye</h2>

The lift coefficient ($C_L$) is a dimensionless coefficient

<div style="color: red;">This is raw HTML in Markdown.</div>

<b className="animate pulse text-blue-500 hover:text-blue-100">Hello Guys</b>
<button onClick="()=>{const targetElement = document.getElementById('targetElement');
    targetElement.scrollIntoView({ behavior: 'smooth' });}">Hello</button>

<button onClick="() => console.log('hello')">Hello</button>



  <hr />

\`\`\`js
function add(a, b) {
  return a + b;
}
\`\`\`

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        // Print "Hello, World!" to the console
        System.out.println("Hello, World!");
    }
}
\`\`\`

\`\`\`jsx
npm run dev
\`\`\`

\`\`\`
npm run dev
\`\`\`

*emphasis*

<div>
_Hello_ <i>Bye</i>
</div>

*This text is italic using Markdown*

<div class="custom-html">
  <!-- Markdown content for HTML tags is not processed -->
  <span class="inner-markdown">
    **This text should be italic but won't be processed inside this HTML tag**
  </span>
</div>

<div class="note">
  Some  and <strong>strong</strong>!
</div>

<i id="targetElement">Why are </i>

<h1>Hello</h1>
`