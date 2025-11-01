'use client';
import * as Components from './components/index';
import React from 'react';

export default function Home() {
  return (
    <>
      <Components.Banner
        message="🎉 We Love Components!"
        position={'bottom'}
        color={'black'}
      />

      <div className="app-grid min-h-screen p-6">
        <nav className="app-col app-col-full">
          <Components.Navbar />
        </nav>

        <header className="app-col app-col-full">
          <Components.Header />
        </header>

        <main className="app-col app-col-main">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="pb-8 text-center text-4xl font-bold">
              Component Tests:
            </h1>

            <h2 className="sticky top-0 z-10 pb-4 text-center text-2xl font-semibold">
              Feedback Components:
            </h2>
            <section>
              <section>
                <p>Badge:</p>
                <Components.Badge text={'Extrem'} />{' '}
                <Components.Badge text={'coole'} color="red" />{' '}
                <Components.Badge text={'Badges'} color="green" />
              </section>

              <section>
                <p>Progressbar:</p>
                <Components.ProgressBar value={60} />
              </section>

              <section>
                <p>Toast:</p>
                <Components.Toast text="Toast text" />
              </section>
            </section>

            <h2 className="sticky top-0 z-10 pb-4 text-center text-2xl font-semibold">
              UI-Content Components:
            </h2>
            <section>
              <section>
                <p>Card:</p>
                <Components.Card
                  header={{
                    title: 'Sample Card',
                  }}
                  body={{
                    description: 'This is a sample card description.',
                  }}
                />
              </section>

              <section>
                <p>List:</p>
                <Components.List
                  items={['Apfel', 'Banane', 'Birne']}
                  renderItem={(item) => <span>{item}</span>}
                />
              </section>

              <section>
                <p>Textarea:</p>
                <Components.Textarea text="text" label="label" />
              </section>

              <section>
                <p>Tooltip:</p>
                <Components.Tooltip text="Hello World">
                  Hover me!
                </Components.Tooltip>
              </section>
            </section>

            <h2 className="sticky top-0 z-10 pb-4 text-center text-2xl font-semibold">
              UI-Input Components:
            </h2>
            <section>
              <section>
                <p>Button:</p>
                <Components.Button color="blue" text="Beschreibung" link="" />
              </section>
              <section>
                <p>Multiple separate Inputfields:</p>

                <Components.Inputfield
                  label="Singleline"
                  defaultValue={''}
                  placeholder="Example Singleline Text"
                  fullWidth
                />

                <Components.Inputfield
                  label="Multiline"
                  defaultValue={''}
                  placeholder="Example Multiline Text"
                  fullWidth
                  multiline
                  rows={4}
                />
              </section>
              <section>
                <p>Slider:</p>
                <Components.Slider />
              </section>
              <section>
                <p>Switch:</p>
                <Components.Switch /> <Components.Switch checked={true} />
              </section>
            </section>

            <h2 className="sticky top-0 z-10 pb-4 text-center text-2xl font-semibold">
              UI-Media Components:
            </h2>
            <section>
              <section>
                <p>Avatar:</p>
                <Components.Avatar
                  src="https://cdn.pixabay.com/photo/2021/12/17/19/15/pet-6877246_1280.jpg"
                  alt="Profilbild einer Katze"
                  size={50}
                  fallback="K"
                />
              </section>
              <section>
                <p>Carousel:</p>
                <Components.Carousel />
              </section>
              <section>
                <p>Gallery:</p>
                <Components.Gallery />
              </section>
              <section>
                <p>Rating: needs icon</p>
                {/*<Components.Rating />*/}
              </section>
            </section>
          </div>
        </main>
      </div>
      <footer>
        <Components.Footer
          links={[
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ]}
          barrierefreiheit={'Barrierefreiheit'}
          copyright={`© ${new Date().getFullYear()} Company`}
        />
      </footer>
    </>
  );
}
