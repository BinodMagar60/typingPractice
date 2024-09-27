
import { useState, useEffect, useRef } from 'react';
import './App.css'


function App() {
  
  const maxTime = 300;
  const [count, setCount] = useState(0);
  const[timeLeft, setTimeLeft] = useState(maxTime)
  const [mistake, setMistake] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping,  setIsTyping] = useState(false)
  const [WPM, setWPM] = useState(0)
  const [CPM, setCPM] = useState(0)
  const inputRef = useRef(null)
  const charRef = useRef([])
  const [correctWrong, setCorrectWrong] = useState([])

  useEffect(()=>{
    inputRef.current.focus()
    setCorrectWrong(Array(charRef.current.length).fill(""))
  },[])

  useEffect (() => {
    let interval;
    if(isTyping && timeLeft > 0){
      interval = setInterval(()=>{

        setTimeLeft(timeLeft-1);
        let  correctChars = charIndex  - mistake;
        let totalTime = maxTime - timeLeft;

        let cpm = correctChars * (60 / totalTime);
        cpm = cpm < 0 || !cpm || cpm ===Infinity? 0 : cpm;
        setCPM(parseInt(cpm, 10));

        let wpm = Math.round((correctChars/5/totalTime) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    }
    else if (timeLeft  === 0){
      clearInterval(interval)
      setIsTyping(false)
    }
    return () => clearInterval(interval)
  },[isTyping, timeLeft])


const nextGame = () =>{
   
      if(count >= paragraph.length-1){
        setCount(0)
      }
      else{
        setCount(count => count + 1)
      }
      console.log(paragraph.length)
      console.log(count)
      setIsTyping(false)
      setTimeLeft(maxTime)
      setCharIndex(0)
      setMistake(0)
      setCPM(0)
      setWPM(0)
      setCorrectWrong(Array(charRef.current.length).fill(""));
      inputRef.current.focus();
  }

 


  const handleChange = (e) =>{
    const characters = charRef.current;
    let currentChar = charRef.current[charIndex];
    let typedChar = e.target.value.slice(-1);

    if(charIndex < characters.length && timeLeft >0 ){
      if(!isTyping){
        setIsTyping(true)
      }

      if(typedChar === currentChar.textContent){
        setCharIndex(charIndex + 1)
        correctWrong[charIndex] = " correct "
      }else{
        setCharIndex(charIndex + 1)
        setMistake(mistake + 1)
        correctWrong[charIndex] = " wrong "
      }

      if(charIndex === characters.length - 1){
        setIsTyping(false)
      }
    }
  }


  const paragraph = ["Having a laptop is essential due to its versatility and convenience. It enables users to perform a wide range of tasks, from professional work to personal projects, all in a portable format. The ability to access information, communicate, and create content on the go enhances productivity and supports a modern lifestyle. Additionally, laptops facilitate learning and collaboration, making them invaluable tools in both educational and professional settings.","Web development can be perceived negatively for several reasons. It often involves complex coding and technical skills that can be daunting for beginners. Additionally, the rapid pace of technological change can lead to constant learning and adaptation, which may overwhelm some developers. Furthermore, issues such as security vulnerabilities, browser compatibility, and the need for ongoing maintenance can create significant challenges. Lastly, the pressure to meet tight deadlines and deliver high-quality work can contribute to stress and burnout in the field.","Gaming offers numerous benefits, including enhanced cognitive skills, improved problem-solving abilities, and increased social interaction. Engaging in video games can stimulate critical thinking and strategic planning, as players often face complex challenges that require quick decision-making. Additionally, multiplayer games foster teamwork and communication, allowing individuals to connect with others and build relationships. Furthermore, gaming can serve as a valuable tool for stress relief and relaxation, contributing positively to mental well-being.","Rain plays a crucial role in maintaining ecological balance and supporting life on Earth. It replenishes freshwater sources, nourishes plants, and sustains agricultural productivity. Additionally, rain helps to regulate temperatures and contributes to the overall health of ecosystems by promoting biodiversity. Furthermore, it can enhance air quality by removing pollutants and dust particles, leading to a cleaner environment.","Education plays a crucial role in personal and societal development. It equips individuals with essential knowledge and skills, fostering critical thinking and informed decision-making. Furthermore, education promotes social cohesion and economic growth, enabling communities to thrive and adapt to changing circumstances. Ultimately, it empowers individuals to pursue their aspirations and contribute meaningfully to society.","Bitcoin holds significant importance due to its role as a decentralized digital currency, which enables peer-to-peer transactions without the need for intermediaries. This characteristic fosters financial inclusion, allowing individuals in underbanked regions to access financial services. Additionally, Bitcoin serves as a hedge against inflation and currency devaluation, attracting investors seeking to preserve their wealth. Its underlying blockchain technology also promotes transparency and security, making it a valuable asset in the evolving landscape of digital finance.","Mobile gaming offers numerous advantages, making it a beneficial form of entertainment. It provides accessibility, allowing users to engage in gaming experiences anytime and anywhere, which enhances convenience. Additionally, mobile games often promote cognitive skills, such as problem-solving and strategic thinking, while also serving as a social platform that connects players globally. Furthermore, the variety of games available caters to diverse interests, ensuring that there is something for everyone, thus fostering inclusivity in the gaming community.","CSS offers distinct advantages over Tailwind, primarily due to its flexibility and control over styling. With traditional CSS, developers can create custom styles tailored to specific design requirements without being constrained by predefined utility classes. This allows for a more streamlined and efficient workflow, particularly in projects where unique design elements are essential. Additionally, CSS promotes better maintainability and readability, as styles can be organized in a way that reflects the structure of the HTML, making it easier for teams to collaborate and update code over time.","WordPress offers several advantages over React, particularly for users seeking a more accessible and user-friendly content management system. Its extensive library of plugins and themes allows for rapid customization without the need for extensive coding knowledge, making it ideal for non-developers. Additionally, WordPress provides built-in SEO features and a robust community support system, facilitating easier website management and maintenance. In contrast, React, while powerful for building dynamic user interfaces, often requires a deeper understanding of programming and development practices, which may not be suitable for all users.","The advantages of a car over a bike are numerous. Cars provide greater protection from the elements, enhanced safety features, and the ability to transport multiple passengers and larger cargo. Additionally, cars typically offer more comfort during travel, especially over long distances, and can operate at higher speeds, making them more efficient for certain types of journeys. Furthermore, cars are often equipped with advanced technology that enhances the driving experience, such as navigation systems and entertainment options."]



  return (
    <div className='container'>
      <div className="test">
      <input type="text" className='input-field' id='inputfield' ref={inputRef} onChange={handleChange}/>
      <label htmlFor="inputfield">
        {
          
          paragraph[count].split("").map((char, index) =>(
           
              <span key={index} className={`char ${index === charIndex? "active": ""}${correctWrong[index]}`} ref={(e) => charRef.current[index] = e}>
              {char}
            </span>
            
          ))
        }
        </label>
      </div>
      <div className="result">
        <p>Time Left: <strong>{timeLeft}s</strong></p>
        <p>Mistake: <strong>{mistake}</strong></p>
        <p>WPM: <strong>{WPM}</strong></p>
        <p>CPM: <strong>{CPM}</strong></p>
        <button className='btn' onClick={nextGame}>Next</button>
      </div>
    </div>
  )
}

export default App
