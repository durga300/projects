import { useState, useEffect } from 'react'
import PerformanceMonitor from './PerformanceMonitor'
import './App.css'

function App() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for boarding schools in Dehradun with real image paths
  const mockSchools = [
    {
      id: 1,
      name: "Doon School",
      location: "Dehradun, Uttarakhand",
      type: "Boarding School",
      rating: 4.8,
      fees: "₹2,50,000/year",
      image: "/school-images/doon-school.jpg",
      description: "One of the premier boarding schools in India with excellent academic and extracurricular programs.",
      color: "#6a11cb"
    },
    {
      id: 2,
      name: "Welham Girls' School",
      location: "Dehradun, Uttarakhand",
      type: "Girls Boarding School",
      rating: 4.7,
      fees: "₹2,20,000/year",
      image: "/school-images/welham-girls-school.jpg",
      description: "A prestigious girls' boarding school with a rich heritage and outstanding educational standards.",
      color: "#2575fc"
    },
    {
      id: 3,
      name: "Woodstock School",
      location: "Dehradun, Uttarakhand",
      type: "Co-ed Boarding School",
      rating: 4.6,
      fees: "₹3,00,000/year",
      image: "/school-images/woodstock-school.jpg",
      description: "An international co-educational boarding school offering world-class education.",
      color: "#ff6b6b"
    },
    {
      id: 4,
      name: "St. George's College",
      location: "Dehradun, Uttarakhand",
      type: "Boys Boarding School",
      rating: 4.5,
      fees: "₹1,80,000/year",
      image: "/school-images/st-georges-college.jpg",
      description: "A renowned boys' boarding school with strong academic and sports programs.",
      color: "#ffd166"
    },
    {
      id: 5,
      name: "The Frank Anthony Public School",
      location: "Dehradun, Uttarakhand",
      type: "Day-Cum-Boarding School",
      rating: 4.4,
      fees: "₹1,50,000/year",
      image: "/school-images/frank-anthony-school.jpg",
      description: "A well-established school offering both day and boarding facilities.",
      color: "#06d6a0"
    }
  ]

  useEffect(() => {
    // Simulate API call with optimized loading
    const timer = setTimeout(() => {
      setSchools(mockSchools)
      setLoading(false)
    }, 300) // Reduced loading time for better UX
    
    return () => clearTimeout(timer)
  }, [])

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      {/* Performance monitoring component */}
      <PerformanceMonitor />
      
      <header className="header">
        <h1>🌟 Eduminatti - School Explorer 🌟</h1>
        <p>Discover the best boarding schools in Dehradun and across India</p>
      </header>

      <main className="main-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search for schools by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search for schools"
          />
        </div>

        {loading ? (
          <div className="loading">
            <div className="skeleton-loader">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          </div>
        ) : (
          <div className="school-list">
            <h2>🏫 Boarding Schools in Dehradun</h2>
            <div className="schools-grid">
              {filteredSchools.map((school, index) => (
                <div 
                  key={school.id} 
                  className="school-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="image-container">
                    <img 
                      src={school.image}
                      alt={school.name}
                      className="school-image"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="school-image-placeholder" 
                      style={{ background: `linear-gradient(45deg, ${school.color}, ${lightenColor(school.color, 30)})` }}
                    >
                      <div className="image-placeholder">
                        <span className="emoji">🏫</span>
                      </div>
                    </div>
                  </div>
                  <div className="school-info">
                    <h3>{school.name}</h3>
                    <p className="location">{school.location}</p>
                    <p className="type">{school.type}</p>
                    <div className="rating">⭐ Rating: {school.rating}/5</div>
                    <p className="fees">{school.fees}</p>
                    <p className="description">{school.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 Eduminatti - School Listing Portal | Made with ❤️ for Education</p>
      </footer>
    </div>
  )
}

// Helper function to lighten a color
function lightenColor(color, percent) {
  const num = parseInt(color.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

export default App