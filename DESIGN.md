# **Design and concepts**

## **Concept I.** `anime.js` always clear animated properties on element

### :x: Bad code

```ts
// anime.js initialization, timeline initialization etc...

timeline.add({
  targets: target,

  scale: [0, 1], // transform: scale(...)
  backgroundColor: "#fff" // background-color: ...
})
```

Element after animation ends:

```html
<target style="transform: scale(1); background-color: #fff">
</target>
```

### :heavy_check_mark: Good code

```ts
// anime.js initialization, timeline initialization etc...

timeline.add({
  targets: target,

  scale: [0, 1], // transform: scale(...)
  backgroundColor: "#FFF" // background-color: ...

  complete: (anim) => {
    for (const animatable of anim.animatables) {
      clearCSSProperties(animatable, ["transform, background-color"])
    }
  }
})
```

Element after animation ends:

```html
<target style="">
</target>
```
