import React, { useState } from "react";
import "../styles/components/sucessStory.scss";
import EducationPopup from "./educationPopup";

const SuccessStory = () => {
  const [isEductionClicked, setisEductionClicked] = useState(false);
  const successStoryData = [
    {
      src: "https://m.economictimes.com/thumb/height-450,width-600,imgsize-59262,msid-99457069/sanjay-dutt-calls-reports-on-injury-baseless-says-he-is-fine-and-healthy.jpg",
      content: ` Sanjay Dutt, born into a film legacy, faced a tumultuous life
                marked by controversy and legal battles, including a stint in
                prison. Despite his early struggles and public setbacks, he made
                a remarkable comeback in Bollywood. His journey is a testament
                to resilience and the power of reinvention. Today, he stands as
                an inspiring figure who transformed his life against all odds.`,
    },
    {
      src: "https://img.jagranjosh.com/images/2022/February/2222022/Lalu-Prasad-Yadav-Biography.jpg",
      content: `Lalu Prasad Yadav is a veteran Indian politician known for his charismatic leadership and deep roots in Bihar's political landscape. Rising from humble beginnings, he became a powerful voice for the marginalized communities, ultimately serving as the Chief Minister of Bihar and later as a key figure at the national level as Railway Minister`,
    },
    {
      src: "https://newsmeter.in/h-upload/2023/09/21/354932-whatsapp-image-2023-09-21-at-25816-pm.webp",
      content: `Jayaprakash Narayan, widely known as JP, was a pivotal figure in India's modern political history. A prominent activist and social reformer, he played a significant role in the freedom movement and later led a call for "Total Revolution" against corruption and authoritarianism in the 1970s.`,
    },
    {
      src: "https://cdn.britannica.com/67/75567-050-4EBBE84D/Nelson-Mandela.jpg?w=400&h=300&c=crop",
      content: `Nelson Mandela was a key figure in the struggle against apartheid in South Africa.
Imprisoned for 27 years due to his anti-segregation activities, he emerged as a global symbol of resilience and reconciliation.After his release, he led South Africa toward a democratic transition and became the nation’s first Black president.`,
    },
    {
      src: "https://www.aljazeera.com/wp-content/uploads/2018/02/83805a54e9504447849b209958612f78_18.jpeg?resize=770%2C513&quality=80",
      content:
        "Malcolm X was a powerful civil rights leader in the United States who underwent a profound transformation during his time in prison. His conversion to Islam reshaped his views, leading him to advocate fiercely for Black empowerment and racial justice. After breaking away from the Nation of Islam, he embraced a broader vision for social change before his untimely assassination.",
    },
    {
      src: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/2/5/1391601493611/Amanda-Knox-012.jpg?width=465&dpr=1&s=none&crop=none",
      content:
        "In 2007, while studying abroad in Perugia, Italy, Knox was accused of being involved in the murder of her roommate, Meredith Kercher.After a series of trials, appeals, and retrials over several years, Amanda Knox was ultimately acquitted by the Italian courts. The complex legal process raised questions about forensic methods and the handling of international cases.",
    },
  ];

  console.log(isEductionClicked);

  return (
    <>
      {isEductionClicked && (
        <EducationPopup
          isEductionClicked={isEductionClicked}
          setisEductionClicked={setisEductionClicked}
        />
      )}
      <div className='success-stories-container d-flex-full d-flex-col'>
        <div className='success-stories-inner-container  d-flex-col gap-16 d-flex-jsc'>
          <p>
            Every step forward builds your legacy—each small victory paving the
            way to a brighter future.
          </p>
          <div className='dasboard-btn-container '>
            <button
              className='p-16 cursor-ptr'
              onClick={() => setisEductionClicked(true)}
            >
              Education
            </button>
          </div>
          <div className='voice-assistent-gif-container d-flex-col d-flex-full cursor-ptr'>
            <img
              src={
                "https://mir-s3-cdn-cf.behance.net/project_modules/hd/f4020f114494633.603cbcc781296.gif"
              }
              style={{
                borderRadius: "100px",
                objectFit: "cover",
              }}
              alt=''
              width={70}
              height={70}
            />
            <span className='cursor-ptr'>Ask me </span>
          </div>
        </div>
      </div>
      <div className='success-stories-body-container d-flex-full'>
        {successStoryData.map((val) => (
          <div className='succes-story-card '>
            <div className='success-story-card-content d-flex-col  gap-16 d-flex-alc'>
              <img src={val?.src} alt='' />
              <p>{val?.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SuccessStory;
