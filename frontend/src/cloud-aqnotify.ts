import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './random-gif.js';

@customElement('cloud-aqnotify')
export class CloudAqnotify extends LitElement {
  @property({ type: Number })
  aqhi = 0;

  @property({ type: String })
  name = '';

  @property({ type: String })
  tag = '';

  _interval: any;

  _endpoint = '/api/current';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: flex-start;
    }

    main {
      width: 100%;
    }

    h1 {
      font-size: min(60vh, 60vw);
      text-align: center;
      margin: 0;
    }

    h2 {
      font-size: min(5vh, 5vw);
      text-align: center;
      margin: 1rem 0 0 0;
    }

    random-gif {
      width: 100%;
    }
  `;

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    this._interval = setInterval(this._update.bind(this), 10000);

    this._update();
  }

  disconnectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.disconnectedCallback();

    clearInterval(this._interval);
  }

  async _update() {
    const response = await fetch(this._endpoint);
    const json = await response.json();
    this.aqhi = json.aqhi;
    this.name = json.nameEn;

    const num = this.aqhi;

    if (num > 7) {
      this.tag = 'sad';
    } else if (num > 5) {
      this.tag = 'disappointed';
    } else {
      this.tag = 'happy';
    }
  }

  render() {
    return html`
      <main>
        <h2>${this.name} AQHI is</h2>
        <h1>${this.aqhi}</h1>
        <random-gif tag=${this.tag}></random-gif>
      </main>
    `;
  }
}
