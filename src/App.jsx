import './App.css'

function App() {

  return (
    <div>
      <div className='menu_header'>
        <div className='menu_name'>Bar & Grill</div>
        <ul className='menu_sections'>
          <button className='menu_sectionButton'>Appetizers</button>
          <button className='menu_sectionButton'>Mains</button>
          <button className='menu_sectionButton'>Sides</button>
          <button className='menu_sectionButton'>Desserts</button>
          <button className='menu_sectionButton'>Drinks</button>
          <button className='menu_sectionButton'>Specials</button>
        </ul>
      </div>
      <div className='menu_wrapper'>

      </div>
    </div>
  )
}

export default App
