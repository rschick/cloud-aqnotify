import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('random-gif')
export class GiphyGif extends LitElement {
  @property({ type: String })
  tag = '';

  @state()
  src = '';

  @state()
  alt = '';

  @state()
  width = 0;

  @state()
  height = 0;

  static styles = css`
    img.full {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `;

  async attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ) {
    // eslint-disable-next-line wc/guard-super-call
    super.attributeChangedCallback(name, _old, value);

    if (!value) {
      return;
    }

    const url = new URL('https://api.giphy.com/v1/gifs/random');
    url.search = new URLSearchParams({
      api_key: 'y0U5veC45jYrMDmXYQcDXM8htToA9zOx',
      tag: this.tag,
      rating: 'g',
    }).toString();

    const response = await fetch(url.toString());
    const { data } = await response.json();

    this.src = data.images.fixed_height.url;
    this.height = data.images.fixed_height.height;
    this.width = data.images.fixed_height.width;
    this.alt = data.title;
  }

  render() {
    return this.src
      ? html`<img class="full" src=${this.src} alt=${this.alt}></img><img src="/assets/PoweredBy_200px-White_HorizText.png" alt="Powered by GIPHY"></img>`
      : null;
  }
}
