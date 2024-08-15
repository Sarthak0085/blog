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

const nextContent = `

## What is Next.js?

The ultimate tool for any React developer to learn and improve their own projects is, without a doubt, **Next.js**.
![](https://res.cloudinary.com/dkzfopuco/image/upload/v1722460013/blog/content/de2b91f2-a0f6-4cd1-9671-9092599595da.png)

Whether I'm building a static site with interactivity like a blog, or a highly dynamic, full-stack project like a social media app, I almost always reach for Next.

The first reason for you to use Next is, as the banner headline states, because it's a **React framework**.

Think of it as a "batteries-included" way to build your React applications, which gives you the simplicity of tools like Create React App, combined with a suite of other super powerful features.

Despite being a framework, Next.js keeps some of the React philosophy of being unopinionated. Next gives you features to improve your overall development experience but doesn't constrain the amount of options you can choose from.

In fact, given what Next makes possible for React apps, I would contend that it has really expanded the number of options available to you, if you need it.

You can get a more complete sense of everything Next.js apps are capable of by checking 100s of example Next.js projects at [nextjs.org/examples]():
![](https://res.cloudinary.com/dkzfopuco/image/upload/v1722460014/blog/content/c5ad2dc3-ec3c-4de1-b31e-0087049d2449.png)


## How to Create a Next.js App

If you have NPM installed, start any new Next project with the command:

\`\`\`
npx create - next - app my - next - project
  \`\`\`

\`create - next - app\` is a package like Create React App, but for Next.js projects.

In short, it gives us a Next project with all its dependencies installed (which are \`next\`, \`react\`, and \`react-dom\`) plus some dummy pages and styles.


## Next.js Scripts

You currently find four main scripts listed in your \`package.json\` file:


\`\`\`
"scripts": {
  "dev": "next dev",
    "build": "next build",
      "start": "next start",
        "lint": "next lint"
}
\`\`\`
To run your Next project in development, make sure you are in your project folder (my-next-project) and run the dev script:
\`\`\`
npm run dev
\`\`\`

## Where to Learn Next.js

What we've covered here just scratches the surface of Next, but you've already gained everything you need to start using Next in your React projects today.

If you want a more in-depth and technical guide, the [official site](https://nextjs.org/learn-pages-router/basics/create-nextjs-app) has an interactive course on how to learn Next.js from the ground up.
`

const animeContent = `
The Hashira of [Demon Slayer](https://screenrant.com/tag/demon-slayer) are considered the strongest demon slayers within the show, having achieved the highest rank within the Demon Slayer Corps. Each of the Hashira are named with special titles that reflect their unique styles and fighting techniques, and each relies on different aspects of their style to slay demons, ranging from speed and cunning to pure strength. Ranking the Hashira by strength is thus a difficult task, as their approaches can be so different.

The Hashira are ranked largely in accordance with their raw power, but don't think that means that those at the bottom are in any way weak. In fact, those at the bottom of the power rankings often have other special tricks up their sleeves to help make up for their lack of physical strength. These are **Demon Slayer's Hashira, ranked by raw strength**.

---

## 12. The Former Flower Hashira - Kanae Kocho
### Debuted in chapter 50 of the manga and episode 24 of the anime
![](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306161/blog/content/f5e62381-9073-4cb4-88e4-6bade3b1293c.jpg)

| Type                  | Feature               |
| ---:                     | ---:                       |
| Breathing Style | Flower Breathing |
| Birthday            | ???                      |
| Age                   | 17                        |

Kanae Kocho was the older sister of Shinobu Kocho, the current Insect Hashira, and served as the Flower Hashira. Kanae Kocho was a gentle and good-natured woman, as well as a skilled demon slayer. She was killed in combat with the Upper Rank Two demon, Doma, whose sad and lonely fate she pitied even as she was dying. **The fact that she was able to go up against an Upper Rank demon for even a little while speaks to her ability**. Kanae's death had a profound effect on Shinobu, as well as their adoptive sister Kanao Tsuyuri, who they saved from slavery.

**The art of Flower Breathing wasn't completely lost**, however; Kanao Tsuyuri is trained in Flower Breathing, and carries on the style's legacy into the final battle. Kanae's spirit even appears to Shinobu in the final battle to encourage her to fight on.

---

## 11. The Former Thunder Hashira - Jigoro Kuwajima
### Debuted in chapter 33 of the manga and episode 17 of the anime
![](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306162/blog/content/2e45bb46-01a9-4122-8a4b-9507eb7dc4f9.jpg)
Jigoro Kuwajima is the former Thunder Hashira, and teacher and adoptive father to Zenitsu Agatsuma, as well as another student named Kaigaku. Jigoro is quite old for a demon slayer, having served as the Thunder Hashira for years until an injury at 35 forced him to retire from demon slaying. **Jigoro was such an impressive slayer that he was given a special title, the "Roaring Hashira," using an ancient kanji to represent his mastery**. Now a teacher of Thunder Breathing, Jigoro ultimately killed himself in ritual suicide when Kaigaku defected and became a demon.

Jigoro was a good teacher, but unfortunately Zenitsu wasn't a great student, so he only managed to teach Zenitsu the first form of Thunder Breathing before his death. That meant that Jigoro **took a lot of valuable knowledge with him when he died**, and it's unclear if Thunder Breathing will become a lost style as a result.

---

## 10. The Former Water Hashira - Sakonji Urokodaki

### Debuted in chapter 2 of the manga and episode 2 of the anime
![Sakonji Urokodaki](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306162/blog/content/4ad41db6-fc0d-457b-936f-f8a1b16a7405.jpg)

Sakonji Urokodaki is the previous Water Hashira who now lives alone and trains young aspiring demon slayers like Tanjiro. In addition to teaching Tanjiro everything he knows about Water Breathing, Urokodaki also taught the current Water Hashira, Giyu Tomioka, showing the true degree of skill that he possessed. **It's rare for demon slayers to live to old age, much less a Hashira, so Urokodaki's very survival is proof that he was an incredibly skilled demon slayer**. Even in his old age, Urokodaki is still competent enough to protect Nezuko when she's entrusted to him.

Aside from being so skilled in Water Breathing, Urokodaki is also a caring man who feels deeply towards his students and often laments their fate at the hands of demons. Like Tanjiro, Urokodaki has a strong sense of smell which can sometimes give him an edge in battle.

---

## 9. The Insect Hashira - Shinobu Kocho
### Debuted in Chapter 28 of the Manga and Episode 15 of the Anime
![Shinobu Kocho](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306163/blog/content/6356e290-bad7-4d20-b3fc-e284e20fd7a0.jpg)

The Insect Hashira, named Shinobu Kocho, is the second active Hashira that fans are introduced to in Demon Slayer, behind only Giyu Tomioka, who makes an appearance in the first episode of the series. Kocho follows in the footsteps of her older sister Kanae Kocho, who was a Hashira before her death, several years prior to the timeline of the anime. Shinobu Kocho is Demon Slayer's only known Insect Breathing practitioner.

While she is a formidable demon slayer and would shine in her own OVA, **Shinobu's abilities rely much more on her cunning and intelligence rather than brute strength**. She is the only Hashira who is not able to slice off the heads of demons, having developed a special poison extracted from wisteria to kill demons instead. This makes her quite a threat, as demons are likely to ignore her attacks that don't go for the head—a potentially fatal mistake.

---

## 8. The Mist Hashira - Muichiro Tokito
### Debuted in Chapter 44 of the Manga and Episode 21 of the Anime
![](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306164/blog/content/3737bf86-4e02-4c17-bab0-704f0d28caa2.jpg)

Aloof and in his own head most of the time, The Mist Hashira Muichiro Tokito is first introduced to fans in one of Demon Slayer's best episodes, the Hashira meeting where Tanjiro and Nezuko's fate will be decided. Tokito is indifferent to the whole matter, but strikes Tanjiro with rocks when he interrupts Kagaya Ubuyashiki. Despite his limited role initially, Muichiro gains more importance during the series' Swordsmith Village arc, where he famously battles the Upper Rank 5 demon Gyokko.

What's particularly impressive about the Mist Hashira is that **Tokito reached the rank of Hashira only two months after joining the Demon Slayer Corps**. He has, so far, managed to go up against the Upper Five demon and survive, and had a major turn of character due to Tanjiro's influence during the Swordsmith Village arc. As one of the youngest Hashira, though, Tokito still has a lot of growth left as a warrior.

---

## 7. The Love Hashira - Mitsuri Kanroji
### Debuted in Chapter 44 of the Manga and Episode 21 of the Anime
![](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306165/blog/content/3688f90c-714a-4383-b083-595dc36a804a.jpg)

Recognizable by her vibrant pink and green hair, the Love Hashira, Mitsuri Kanroji, is an incredibly emotional and passionate individual with great love towards her fellow demon slayers. She especially shows a fondness for Obanai Iguro, who she has quite a strong bond with. Beneath her bubbly exterior though, Mitsuri is an adept fighter who is a force to be reckoned with.

**Kanroji first joined the Demon Slayer Corps not to improve on her own fighting abilities, but to find a suitable husband**, as she believes her husband must be stronger than she is. Her rise to the rank of Hashira and the raw strength that she possesses to get there has proven this to be a difficult task, despite her best efforts. [Kanroji's sword is one of her most unique attributes in Demon Slayer](https://screenrant.com/demon-slayer-love-hashira-coolest-sword-mitsuri/), as its whip-like flexibility makes its movements difficult for demons to predict, and is a perfect fit for Love Breathing's fluid motions.

---

## 6. The Snake Hashira - Obanai Iguro
### Debuted in Chapter 45 of the Manga and Episode 22 of the Anime

![Obanai Iguro](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306166/blog/content/3a947c39-bf16-4edc-bb38-404a87ead9c2.jpg)

The Snake Hashira, Obanai Iguro, is one of the most mysterious characters within the world of Demon Slayer. Recognizable by the white snake wrapped around his neck and the bandage he wears over his mouth, he was one of the foremost objectors to [Nezuko's inclusion as a demon slayer](https://screenrant.com/demon-slayer-nezuko-strongest-hashira/), due to his own negative experiences being raised as a sacrifice for a snake demon. It's this mysterious and often harsh nature that makes him such an odd but compelling match for Mitsuri.

Born partially blind, Iguro has molded his livelihood and fighting abilities around this, rising all the way to the rank of Hashira. While he is of shorter stature, **Iguro's mental fortitude and strictness make him a formidable opponent**. This is most obvious when he berates Tengen Uzui for barely defeating the weakest upper-rank demon and then choosing to retire, showcasing his hatred of perceived mental weakness.

---


## 5. The Sound Hashira - Tengen Uzui
### Debuted in Chapter 44 of the Manga and Episode 21 of the Anime

![Tengen Uzui](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306167/blog/content/e729c1fb-692c-4514-a281-bb3748975a11.jpg)

The Sound Hashira Tengen Uzui is integral to the defeat of the Upper Six demons Gyutaro and Daki by Tanjiro and company in the Entertainment District arc. Balancing his role as a Hashira with being a dutiful husband to his three ninja wives, Uzui is dedicated to slaying demons. Despite his intense and fast-paced fighting style, Uzui insists that he is not talented while talking to Gyutaro and Daki during their fight.

While Uzui may not believe he is talented, his abilities in battle tell a different story. His fearlessness in the face of death due to his years as a shinobi and **Uzui's lightning-fast speed in battle make him an incredible warrior**. He also showcases his strength in his swift wielding of his gigantic nunchaku cleavers, which he can swing at the speed of sound, despite their size. He ended up retiring after defeating the Upper Six, having suffered grave injuries in the fight.

---

## 4. The Wind Hashira - Sanemi Shinazugawa
### Debuted in Chapter 45 of the Manga and Episode 22 of the Anime

![Sanemi Shinazugawa](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306167/blog/content/1e8bd21d-9785-4a80-8c0d-92f7d83b38ff.jpg)

The Wind Hashira, named Sanemi Shinazugawa, puts his brashness and hatred of demons on display in season one of Demon Slayer, attacking one of [Demon Slayer's strongest demons](http://screenrant.com/demon-slayer-strongest-demons-ranked/), Nezuko, in her box and then attempting to goad her into attacking him. While this fails and Nezuko is allowed to continue to accompany Tanjiro, Shinazugawa remains staunchly against the co-existence of demons and humans as a result of his past. His brother, Genya, is also a demon slayer who joined around the same time as Tanjiro.

**One of the fastest of all the Hashira, Shinazugawa is an intensely strong swordsman** who uses speed to his advantage in battle. Despite his physical prowess, however, his hotheaded nature can get the best of him, as can be seen when Tanjiro is able to strike him with a headbutt during the Hashira meeting. Shinazugawa's style revolves around speed.

---
## 3. The Water Hashira - Giyu Tomioka
### Debuted in Chapter 1 of the Manga and Episode 1 of the Anime
![Giyu Tomioka](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306168/blog/content/8dd1dc17-2127-4348-ab23-111c870df923.jpg)

The Water Hashira, Giyu Tomioka, is incredibly poised in battle and shows calmness and restraint that is unmatched among the Hashira, especially when he allows Nezuko to live in the first episode of Demon Slayer. This mental strength is further shown when he endorses Nezuko's place in the *Demon Slayer* Corps, agreeing to slit his own stomach if she harms any human.

A student of the water technique under former Water Hashira, Sakonji Urokodaki, Tomioka brings a calm strength to battle that allows him to dispatch enemies with terrifying ease. His incredible strength is shown particularly in his killing of the lower six demon Rui, who he easily defeats using his technique, "dead calm." Though Tomioka's appearances have been sparse but impactful so far in the anime, he plays a much larger role in the upcoming *To The Hashira Training arc that Demon Slayer season 4* is based on.

---

## 2. The Flame Hashira - Kyojuro Rengoku
### Debuted in Chapter 44 of the Manga and Episode 21 of the Anime
![Kyojuro Rengoku](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306169/blog/content/cf5900fb-b8cf-49a7-a9e3-aaaac54db5fd.jpg)

The *main Hashira in the Mugen Train arc of the Demon Slayer series*, the Flame Hashira, whose name is Kyojuro Rengoku, shows incredible poise and strength in battle... up until his death at the hands of the Upper Rank Three demon, Akaza. He is able to hold his own in the battle, with Akaza barely escaping before dawn by ripping off his arm while it was still embedded in Rengoku. Despite his early exit from the series though, **Rengoku easily ranks as the second strongest Hashira in Demon Slayer**.

**Rengoku combines the strength of flame breathing with his confident demeanor to make a formidable demon slayer**. He is able to save every single passenger on the Mugen Train after its derailing due to quick thinking and fighting prowess and is complemented by Akaza on his fighting, which he states hasn't reached its full potential... and sadly never will.

---

## 1. The Stone Hashira - Gyomei Himejima
### Debuted in Chapter 44 of the Manga and Episode 21 of the Anime
![Gyomei Himejima](https://res.cloudinary.com/dkzfopuco/image/upload/v1723306170/blog/content/79a666a9-0dc2-431e-9080-a3b213716706.jpg)

Gyomei Gimejima is the name of the Stone Hashira, who acts as mentor to Genya Shinazugawa, the Wind Hashira's younger brother. He's an imposing figure with a gentle and sensitive emotional nature. He is frequently seen shedding tears for his fellow demon slayers, carrying prayer beads with him at almost all times and frequently praying for other fighters.

The largest of the Hashira by a wide margin, [*Demon Slayer's Gyomei Himejima*](http://screenrant.com/demon-slayer-gyomei-himejima-strongest-hashira/)** is also the most respected due to his immense strength**. He is frequently treated as their de facto leader, being entrusted by Kagaya Ubuyashiki to give out orders. Like Tokito, he also became a Hashira only two months after joining the Demon Slayer Corps, showcasing the prowess of his strength in battle. While some may be stronger than others, all of *Demon Slayer's* Hashira are incredibly powerful. Still, even among such an elite group of fighters, **Gyomei easily takes top rank as Demon Slayer's strongest Hashira**.
`