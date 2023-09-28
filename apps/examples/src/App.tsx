import { Zoom, Bounce, Flip, Rotate, Roll, LightSpeed, Fade } from 'react-swift-reveal';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from './components/Footer';

// Reusable Section Component
const Section = ({ title, children }:
  { title: string, children: React.ReactNode }
) => (
  <section className="flex flex-col items-center  w-full  min-h-[60vh] p-8 bg-white rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </section>
);

export default function App() {
  return (
    <Router>
      <main className='space-y-4'>
        <Navbar />
        <div className="flex flex-col px-6 md:px-12 lg:px-16 xl:px-20 items-center justify-center min-h-screen bg-gray-100">
          {/* Zoom Animation */}
          <Section title="Zoom Animation">
            <Zoom>
              <div className="p-4 bg-blue-100 rounded-lg">
                <p className="text-gray-700">
                  This element will zoom in as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
              <Zoom delay={500} duration={2000}>
                <p className="mt-4 text-gray-700">
                  More content about Zoom Animation.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ipsa amet tempore optio perferendis cupiditate nesciunt ipsam impedit. Debitis, cupiditate mollitia maiores molestias saepe esse natus. Quis labore libero beatae.
                  Eveniet facere blanditiis delectus qui magnam quis! Non error eaque dolorum ullam porro natus, rem molestias nesciunt esse molestiae ducimus at facere assumenda maiores iste. Dolorum sapiente reiciendis error saepe.
                  Dicta deserunt ducimus distinctio veniam impedit nisi alias dignissimos eaque sapiente rem voluptate eum, ab molestiae tempora! Quia beatae doloremque excepturi eum nulla perferendis a dolores voluptate tempora odio. Placeat!
                  Enim corporis ab suscipit velit, nemo quasi sapiente minima? Totam, eaque optio. Voluptatibus inventore maxime perferendis odio! Quod deserunt blanditiis quisquam cum fuga, perspiciatis quas consequuntur culpa odit deleniti adipisci.
                  Voluptatem nihil nemo pariatur est praesentium voluptatum dicta velit adipisci dignissimos optio quia, animi cum modi deleniti laudantium possimus qui harum libero eos quas maxime! Ducimus, illum? Iste, sed ratione.
                  Animi sequi numquam perspiciatis harum officia? Pariatur explicabo non velit tempore tempora nesciunt incidunt necessitatibus magnam natus, commodi corporis repellendus excepturi debitis vero rerum deleniti nobis amet veniam illum officia?
                </p>
              </Zoom>
            </Zoom>
          </Section>

          {/* Bounce Animation */}
          <Section title="Bounce Animation">
            <Bounce>
              <div className="p-4 bg-green-100 rounded-lg">
                <p className="text-gray-700">
                  This element will bounce as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
            </Bounce>
            <Bounce delay={600} duration={2300}>
              <p className="mt-4 text-gray-700">
                More content about Bounce Animation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat blanditiis praesentium accusamus cupiditate quod magni minus fuga dicta asperiores adipisci nisi ex quibusdam ad, cum voluptate facere perferendis mollitia ipsum?
                Culpa, adipisci. Cumque exercitationem perspiciatis dolorem vero debitis? Reprehenderit cumque ea tenetur laboriosam nulla veniam. Alias minus voluptatem necessitatibus provident, possimus dolore dolorem sapiente quia aliquid eos iure adipisci maiores.
                Similique voluptates quos est ducimus fugiat, ullam odio aliquid. Deserunt temporibus amet similique provident ullam dolores dolorum accusantium quasi quia, fugit praesentium est libero maxime enim, voluptates, aspernatur quibusdam delectus!
                Quidem tempore inventore quia similique facilis voluptatum deleniti, repellat nesciunt ipsa libero, ab minima nobis id nemo assumenda iusto commodi sapiente adipisci cupiditate culpa accusamus officiis deserunt quam iste. Cum.
                Quasi aspernatur hic eveniet, quam, consequatur reprehenderit delectus culpa dolorem commodi laudantium doloribus odit repudiandae? Eveniet harum commodi, cumque, maiores recusandae aliquid eligendi nihil similique nemo adipisci quasi deserunt beatae?
                Perferendis sint obcaecati minima accusamus aut, dicta velit, accusantium ipsam excepturi cupiditate optio qui quidem pariatur laudantium natus iusto numquam id eveniet hic necessitatibus nobis. Labore omnis perferendis vero ratione!
              </p>
            </Bounce>
          </Section>

          {/* Slide Animation */}
          {/* <Section title="Slide Animation">
            <Slide>
              <div className="p-4 bg-yellow-100 rounded-lg">
                <p className="text-gray-700">
                  This element will slide as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
              <p className="mt-4 text-gray-700">
                More content about Slide Animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
              </p>
            </Slide>
          </Section> */}


          {/* Flip Animation */}
          <Section title="Flip Animation">
            <Flip>
              <div className="p-4 bg-pink-100 rounded-lg">
                <p className="text-gray-700">
                  This element will flip as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
              <Zoom duration={2000} delay={1100}>
                <p className="mt-4 text-gray-700">
                  Flip with Zoom. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis hic aspernatur voluptatem aut. Quod eius eveniet officiis error accusamus dolorum obcaecati itaque! Culpa excepturi enim sunt autem. Amet, praesentium distinctio.
                  Repudiandae eos placeat asperiores omnis perspiciatis ad officiis explicabo dolorum debitis quibusdam maxime, veritatis ipsum rem minus cupiditate mollitia! Ipsa dolore doloribus quae, praesentium quibusdam minus omnis enim ea architecto?
                  Nobis dignissimos quas ex officia optio ullam, omnis repudiandae, veniam maxime necessitatibus quaerat eius magni maiores perspiciatis nesciunt tenetur harum eligendi tempore itaque laudantium. Ad maxime accusamus voluptas? Accusantium, odio.
                  Animi esse velit tempore similique corporis labore expedita rerum aspernatur ab, numquam consequuntur ipsum modi quasi rem commodi adipisci non quaerat at maiores vero unde. Amet maxime error magnam beatae!
                  Voluptatibus, impedit reiciendis est consectetur facilis magnam omnis qui ullam nobis doloribus! Quasi qui accusantium amet esse ex cupiditate! Libero cum nostrum eligendi neque, vitae id assumenda cumque nihil nobis.
                </p>
              </Zoom>
            </Flip>
          </Section>



          {/* Roll Animation */}
          <Section title="Roll Animation">
            <Roll>
              <div className="p-4 bg-indigo-100 rounded-lg">
                <p className="text-gray-700">
                  This element will roll as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
            </Roll>
            <p className="mt-4 text-gray-700">
              More content about Roll Animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
            </p>
          </Section>

          {/* LightSpeed Animation */}
          <Section title="LightSpeed Animation">
            <LightSpeed>
              <div className="p-4 bg-red-100 rounded-lg">
                <p className="text-gray-700">
                  This element will move with lightspeed as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
            </LightSpeed>
            <LightSpeed delay={1000} duration={2100}>
              <p className="mt-4 text-gray-700">
                More content about LightSpeed Animation. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, nam. Dolor soluta rerum numquam possimus maxime exercitationem ab minima. Dolores, commodi quasi? Voluptate, iste repudiandae iusto modi culpa ab temporibus.
                Molestias eaque minus illum, voluptas rem aut officiis culpa repellendus aliquid, mollitia accusantium optio iusto dolore perspiciatis! Neque sint unde maxime in quisquam voluptatum. Cum eveniet assumenda repudiandae vero modi!
                Voluptate modi debitis, pariatur obcaecati vel voluptatibus dolores accusamus doloremque voluptas! Fugiat labore perferendis numquam voluptates eaque molestias dolor culpa obcaecati suscipit, commodi voluptas ipsum omnis laboriosam alias quaerat tempore!
                Corrupti expedita nisi debitis accusamus excepturi obcaecati exercitationem nemo ad vel accusantium vero suscipit, maxime, harum ipsam fugiat cumque optio impedit illo? Aspernatur fugit neque consectetur ea placeat animi dicta!
                Ullam necessitatibus labore veritatis. Nihil vel exercitationem molestiae molestias saepe inventore laborum. Pariatur eveniet voluptates ex laboriosam, minima illum magni, beatae similique expedita nemo odio quidem temporibus ad quod amet.
                Deleniti illum inventore numquam quisquam odit incidunt nam dolorem saepe repudiandae? Animi velit, aperiam, similique deleniti saepe illo magnam architecto pariatur fuga asperiores, modi ipsam quaerat omnis dicta nostrum eos.
              </p>
            </LightSpeed>
          </Section>

          {/* Fade Animation */}
          <Section title="Fade Animation">
            <Fade duration={2000}>
              <div className="p-4 bg-teal-100 rounded-lg">
                <p className="text-gray-700">
                  This element will fade in as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
            </Fade>
            <Fade delay={1100} >
              <p className="mt-4 text-gray-700">
                More content about Fade Animation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet delectus, soluta corrupti quas laboriosam itaque? Consectetur asperiores voluptatem modi cum earum dolor, nisi explicabo sunt delectus nam nemo consequuntur nulla?
                Architecto saepe, autem libero qui vel molestias vero quaerat quis assumenda excepturi exercitationem, corrupti ipsum. Consequuntur saepe, odit, error suscipit ab eos dolorem id quasi corrupti tempora reiciendis consectetur ratione.
                Odit quae quas quia, nam atque expedita illum qui deleniti facilis eveniet mollitia iste ad nulla repellendus quod nesciunt totam modi! Deserunt veritatis perferendis suscipit, est optio quia asperiores a?
                Quidem velit maiores molestias aspernatur enim, dolore aliquam tenetur, animi quisquam commodi rerum eius voluptatem quod corrupti officia quibusdam, itaque officiis consequuntur iusto dolor odit odio. Possimus nam error tempora?
                Vitae iure in nam corrupti. Earum, sunt perspiciatis fugit repellendus odio, blanditiis quas provident optio libero eos neque iure quia numquam quibusdam eligendi quidem ab eius nobis alias quaerat praesentium.
                Nobis inventore distinctio fugit perferendis accusamus sint, illum id explicabo eum nulla est animi quisquam ipsa, vero rerum aperiam a quaerat tempore. Eius in aliquam aut sit earum, distinctio suscipit.
              </p>
            </Fade>
          </Section>

          {/* Rotate Animation */}
          <Section title="Rotate Animation">
            <Rotate >
              <div className="p-4 bg-purple-100 rounded-lg">
                <p className="text-gray-700">
                  This element will rotate as it enters the viewport. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis eleifend sapien, vel hendrerit justo eleifend vel.
                </p>
              </div>
            </Rotate>
            <Rotate delay={1000} duration={2000}>
              <p className="mt-4 text-gray-700">
                More content about Rotate Animation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sequi, necessitatibus ducimus dolor in eveniet cum, cumque officiis quas molestiae perferendis fugiat eligendi recusandae nesciunt temporibus animi facilis minus dignissimos!
                Mollitia veniam natus quam quisquam, totam necessitatibus adipisci inventore nostrum atque, cumque sint, sapiente numquam accusantium praesentium. Delectus quidem dolore non pariatur quis atque possimus porro minima omnis. Porro, blanditiis.
                Unde inventore ab animi accusamus quis necessitatibus cumque labore dicta quam aspernatur eaque voluptatibus modi at illo eos, quibusdam quasi et odio mollitia? Quidem accusantium similique in quaerat officia autem?
                Nobis, tempora sit repudiandae iste dolore totam veniam doloribus dolor odio consectetur numquam praesentium corrupti est. Suscipit, fugiat earum, numquam eum similique voluptas, voluptate ratione eius tenetur vero aperiam dolore.
                Laboriosam mollitia alias sequi molestias rem libero, cum aperiam odio eum perspiciatis voluptates atque, iusto sapiente pariatur repudiandae ab? Sit qui, ad nobis obcaecati blanditiis ullam voluptate vitae. Vel, neque.
                Eius quod modi, id dignissimos accusamus, perferendis molestiae cum velit voluptatibus odit unde voluptatum quos eligendi sequi, debitis voluptatem. Unde voluptas sit eos rem deserunt molestiae consequuntur est esse libero?
              </p>
            </Rotate>
          </Section>
        </div>
        <Footer />
      </main>
    </Router>
  );
}
