import PropTypes from "prop-types";
import Layout from "../components/Layout";
import Hero from "../components/Hero/Hero";
import Button from "../components/Button/Button";
import TextBlock from "../components/TextBlockWithHeader/TextBlock";
import NewCard from "../components/NewCard";
import Partners from "../components/Partners";
import { NewsSection } from "../components/ImageColumn";
import styles from "../styles/homepage.module.scss";
import DynamicComponent from "../storyblok/components/DynamicComponent";
import { getGlobalComponentByName } from "../storyblok/utils/getGlobalComponentByName";

export { initialPropsWithNews as getServerSideProps } from "../storyblok/utils/initialPropsWithNews";

const Home = ({ title, desc, path, image, story, news }) => {
  const pageMeta = {
    title,
    desc,
    path,
    image,
  };

  const { Body } = story.content;

  return (
    <Layout
      meta={pageMeta}
      navbar={getGlobalComponentByName(story, "navbar")}
      footer={getGlobalComponentByName(story, "footer")}
    >
      <Hero
        title={Body[0].title}
        body={Body[0].subtitle}
        extraContent={
          <>
            <Button
              content={Body[0].button_text}
              color="purple"
              type="default"
              href={Body[0].link.cached_url}
            />
          </>
        }
        imagePath={Body[0].image.filename}
        imageType="background"
      />
      <div className={styles.text_block}>
        <TextBlock
          id={Body[1].id}
          headerText={Body[1].title}
          paragraphs={Body[1].paragraphs}
          isIntro
        />
      </div>
      <div className={styles.card_1}>
        <NewCard
          id={Body[2].id}
          title={Body[2].data[0].header}
          paragraphs={Body[2].data[0].paragraphs}
          listData={{
            type: "check",
            columns: Body[2].data[0].list_data[0].columns,
          }}
          imagePath={Body[2].data[0].images.filename}
          imageAlt={Body[2].data[0].image_alt_text}
          color="purple"
          isReversed
          hasRoundedBorder
          hasShadow
          imageSize
          buttonSpacing
          buttonHoverType="default"
          bottomComponent={
            <Button
              content={Body[2].Button[0].button_label}
              color="purple"
              href={Body[2].Button[0].link.cached_url}
            />
          }
        />
      </div>
      <div className={styles.card_earthcap}>
        <NewCard
          id={Body[3].id}
          title={Body[3].data[0].header}
          paragraphs={Body[3].data[0].paragraphs}
          listData={{
            type: "check",
            columns: Body[3].data[0].list_data[0].columns,
          }}
          imagePath={Body[3].data[0].images.filename}
          imageAlt={Body[3].data[0].image_alt_text}
          color="purple"
          hasRoundedBorder
          hasShadow
          imageSize
          bottomText={Body[3].bottom_text}
        />
      </div>
      <div className={styles.card_2}>
        <NewCard
          id={Body[4].id}
          title={Body[4].data[0].header}
          paragraphs={Body[4].data[0].paragraphs}
          imagePath={Body[4].data[0].images.filename}
          imageAlt={Body[4].data[0].image_alt_text}
          hasRoundedBorder
          backgroundColor="blue"
          color="white"
          isReversed
          hasTextSpacing
          bottomComponent={
            <Button
              content={Body[4].Button[0].button_label}
              color="purple"
              href={Body[4].Button[0].link.cached_url}
            />
          }
        />
      </div>
      <Partners id={Body[5].id} sections={Body[5].sections} hasShortIcons />
      <NewsSection news={news} />
      <div>
        <DynamicComponent
          blok={getGlobalComponentByName(story, "ctasection")}
        />
      </div>
    </Layout>
  );
};

Home.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  story: PropTypes.object,
  news: PropTypes.arrayOf(
    PropTypes.shape({
      main_image: PropTypes.shape({ filename: PropTypes.string.isRequired }),
      imagePath: PropTypes.string.isRequired,
      article_type: PropTypes.oneOf(["Insights", "News"]).isRequired,
      date: PropTypes.string.isRequired,
      full_slug: PropTypes.string.isRequired,
      article_heading: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Home.defaultProps = {
  story: {},
  title: "Empowering everyone to adapt with climate change  | Cervest",
  desc: "Cervest’s Climate Intelligence Platform transforms climate science into personalized and actionable insights on millions of assets",
  path: "index",
  image: null,
};

export default Home;
