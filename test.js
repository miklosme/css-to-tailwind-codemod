const cssToTailwind = require('./css-to-tailwind');
const withCustomConfig = require('./with-custom-config');
const path = require('path');

const inputCss = `
      .alert {
        position: relative;
        padding: 1.6rem 4.6rem;
        margin-bottom: 1.6rem;
        border: 1px solid #FAD0D0;
        color: #fff;
        border-radius: 0.2rem;
        width: 100%;
      } 
      
      .guest-layout__logo {
        margin-bottom: 1.6rem;
        min-height: 4rem;
        display: flex;
        justify-content: center;
      }
      
      .guest-layout__container {
        background: #ffffff;
        border: 1px solid #e5e5e5;
        border-radius: 0.2rem;
      } 
      
      .guest-layout {
        margin: 8rem auto;
        max-width: fit-content;
      }
      
      .guest-layout__header {
        font-weight: 400;
        font-size: 2rem;
        line-height: 3rem;
        letter-spacing: 0.03rem;
        padding: 2.4rem;
        border-bottom: 1px solid #e5e5e5;
      }
      
      .guest-layout__footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row-reverse;
        padding: 2.4rem 3rem;
        border-top: 1px solid #e5e5e5;
      }
      
      .guest-layout__footer--compact {
        border: none;
        padding: 0;
        margin-top: 1.6rem;
      }
      
      .guest-layout__content {
        display: flex;
        flex-wrap: nowrap;
        width: 38rem;
      }
      
      .guest-layout__content--with-side-content {
        width: 76rem;
      }
      .guest-layout__content--with-side-contentdfdf {
        width: 50%;
      }
      
      .guest-layout__content--with-side-contentdfdf {
        width: 50%;
      }
      .guest-layout__content--with-separatordfdfdf{
        border-right: 1px solid #e5e5e5;
      }
      .guest-layout__content-inner {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0;
        padding: 3rem;
      }
      
      .guest-layout__content--with-separatordfdf {
        background: unset;
      }
      .guest-layout__side-content {
        width: 50%;
        background: #e3e6e6;
        padding: 3rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
      .guest-layout__dfdfdfdf {
        margin-top: 0;
      }
    `;

test('cssToTailwind', async () => {
    const results = await cssToTailwind(inputCss);

    expect(results).toHaveLength(15);
    expect(results.filter((res) => res.missing.length)).toHaveLength(10);
    expect(results).toMatchInlineSnapshot(`
        Array [
          Object {
            "missing": Array [
              Array [
                "border-color",
                "rgba(250, 208, 208, 1)",
              ],
            ],
            "selector": ".alert",
            "tailwind": "rounded border-solid border mb-6 py-6 px-20 relative text-white w-full",
          },
          Object {
            "missing": Array [
              Array [
                "min-height",
                "4rem",
              ],
            ],
            "selector": ".guest-layout__logo",
            "tailwind": "flex justify-center mb-6",
          },
          Object {
            "missing": Array [
              Array [
                "border-color",
                "rgba(229, 229, 229, 1)",
              ],
            ],
            "selector": ".guest-layout__container",
            "tailwind": "bg-white rounded border-solid border",
          },
          Object {
            "missing": Array [
              Array [
                "max-width",
                "fit-content",
              ],
            ],
            "selector": ".guest-layout",
            "tailwind": "my-32 mx-auto",
          },
          Object {
            "missing": Array [
              Array [
                "line-height",
                "48px",
              ],
              Array [
                "border-color",
                "rgba(229, 229, 229, 1)",
              ],
            ],
            "selector": ".guest-layout__header",
            "tailwind": "border-solid border-b font-normal text-3xl p-10 tracking-wide",
          },
          Object {
            "missing": Array [
              Array [
                "border-color",
                "rgba(229, 229, 229, 1)",
              ],
            ],
            "selector": ".guest-layout__footer",
            "tailwind": "border-solid border-t flex flex-row-reverse items-center justify-between py-10 px-12 w-full",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__footer--compact",
            "tailwind": "mt-6 p-0",
          },
          Object {
            "missing": Array [
              Array [
                "width",
                "608px",
              ],
            ],
            "selector": ".guest-layout__content",
            "tailwind": "flex flex-no-wrap",
          },
          Object {
            "missing": Array [
              Array [
                "width",
                "1216px",
              ],
            ],
            "selector": ".guest-layout__content--with-side-content",
            "tailwind": "",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content--with-side-contentdfdf",
            "tailwind": "w-1\\\\/2",
          },
          Object {
            "missing": Array [
              Array [
                "border-color",
                "rgba(229, 229, 229, 1)",
              ],
            ],
            "selector": ".guest-layout__content--with-separatordfdfdf",
            "tailwind": "border-solid border-r",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content-inner",
            "tailwind": "flex flex-col justify-center m-0 p-12 w-full",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content--with-separatordfdf",
            "tailwind": "",
          },
          Object {
            "missing": Array [
              Array [
                "background-color",
                "rgba(227, 230, 230, 1)",
              ],
            ],
            "selector": ".guest-layout__side-content",
            "tailwind": "flex flex-col justify-center p-12 w-1\\\\/2",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__dfdfdfdf",
            "tailwind": "mt-0",
          },
        ]
    `);
});

test('withCustomConfig', async () => {
    const customCssToTailwind = await withCustomConfig({
        TAILWIND_CONFIG: path.resolve(process.cwd(), 'customs/tailwind.config.js'),
        COLOR_DELTA: 5,
    });

    const results = await customCssToTailwind(inputCss);

    expect(results).toHaveLength(15);
    expect(results.filter((res) => res.missing.length)).toHaveLength(5);
    expect(results).toMatchInlineSnapshot(`
        Array [
          Object {
            "missing": Array [],
            "selector": ".alert",
            "tailwind": "border-tlp-red rounded border-solid border mb-6 py-6 px-20 relative text-neutral-0 w-full",
          },
          Object {
            "missing": Array [
              Array [
                "min-height",
                "4rem",
              ],
            ],
            "selector": ".guest-layout__logo",
            "tailwind": "flex justify-center mb-6",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__container",
            "tailwind": "bg-neutral-0 border-neutral-100 rounded border-solid border",
          },
          Object {
            "missing": Array [
              Array [
                "max-width",
                "fit-content",
              ],
            ],
            "selector": ".guest-layout",
            "tailwind": "my-32 mx-auto",
          },
          Object {
            "missing": Array [
              Array [
                "line-height",
                "48px",
              ],
            ],
            "selector": ".guest-layout__header",
            "tailwind": "border-neutral-100 border-solid border-b font-normal text-3xl p-10 tracking-wide",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__footer",
            "tailwind": "border-neutral-100 border-solid border-t flex flex-row-reverse items-center justify-between py-10 px-12 w-full",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__footer--compact",
            "tailwind": "mt-6 p-0",
          },
          Object {
            "missing": Array [
              Array [
                "width",
                "608px",
              ],
            ],
            "selector": ".guest-layout__content",
            "tailwind": "flex flex-no-wrap",
          },
          Object {
            "missing": Array [
              Array [
                "width",
                "1216px",
              ],
            ],
            "selector": ".guest-layout__content--with-side-content",
            "tailwind": "",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content--with-side-contentdfdf",
            "tailwind": "w-1\\\\/2",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content--with-separatordfdfdf",
            "tailwind": "border-neutral-100 border-solid border-r",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content-inner",
            "tailwind": "flex flex-col justify-center m-0 p-12 w-full",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__content--with-separatordfdf",
            "tailwind": "",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__side-content",
            "tailwind": "bg-neutral-100 flex flex-col justify-center p-12 w-1\\\\/2",
          },
          Object {
            "missing": Array [],
            "selector": ".guest-layout__dfdfdfdf",
            "tailwind": "mt-0",
          },
        ]
    `);
});
