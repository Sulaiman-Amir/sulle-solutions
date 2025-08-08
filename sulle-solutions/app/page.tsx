'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronDown, ExternalLink, Phone, Mail, MapPin, Cloud, Shield, Cpu, Settings, Users, Headphones, MessageCircle, X, Search } from 'lucide-react'

export default function SulleLandingPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [showCEOMessage, setShowCEOMessage] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showContactSuccess, setShowContactSuccess] = useState(false)

  const countries = [
    { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
    { code: "+355", name: "Albania", flag: "🇦🇱" },
    { code: "+213", name: "Algeria", flag: "🇩🇿" },
    { code: "+1", name: "American Samoa", flag: "🇦🇸" },
    { code: "+376", name: "Andorra", flag: "🇦🇩" },
    { code: "+244", name: "Angola", flag: "🇦🇴" },
    { code: "+1", name: "Anguilla", flag: "🇦🇮" },
    { code: "+1", name: "Antigua and Barbuda", flag: "🇦🇬" },
    { code: "+54", name: "Argentina", flag: "🇦🇷" },
    { code: "+374", name: "Armenia", flag: "🇦🇲" },
    { code: "+297", name: "Aruba", flag: "🇦🇼" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+43", name: "Austria", flag: "🇦🇹" },
    { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
    { code: "+1", name: "Bahamas", flag: "🇧🇸" },
    { code: "+973", name: "Bahrain", flag: "🇧🇭" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
    { code: "+1", name: "Barbados", flag: "🇧🇧" },
    { code: "+375", name: "Belarus", flag: "🇧🇾" },
    { code: "+32", name: "Belgium", flag: "🇧🇪" },
    { code: "+501", name: "Belize", flag: "🇧🇿" },
    { code: "+229", name: "Benin", flag: "🇧🇯" },
    { code: "+1", name: "Bermuda", flag: "🇧🇲" },
    { code: "+975", name: "Bhutan", flag: "🇧🇹" },
    { code: "+591", name: "Bolivia", flag: "🇧🇴" },
    { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { code: "+267", name: "Botswana", flag: "🇧🇼" },
    { code: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "+1", name: "British Virgin Islands", flag: "🇻🇬" },
    { code: "+673", name: "Brunei", flag: "🇧🇳" },
    { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
    { code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
    { code: "+257", name: "Burundi", flag: "🇧🇮" },
    { code: "+855", name: "Cambodia", flag: "🇰🇭" },
    { code: "+237", name: "Cameroon", flag: "🇨🇲" },
    { code: "+1", name: "Canada", flag: "🇨🇦" },
    { code: "+238", name: "Cape Verde", flag: "🇨🇻" },
    { code: "+1", name: "Cayman Islands", flag: "🇰🇾" },
    { code: "+236", name: "Central African Republic", flag: "🇨🇫" },
    { code: "+235", name: "Chad", flag: "🇹🇩" },
    { code: "+56", name: "Chile", flag: "🇨🇱" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+57", name: "Colombia", flag: "🇨🇴" },
    { code: "+269", name: "Comoros", flag: "🇰🇲" },
    { code: "+242", name: "Congo", flag: "🇨🇬" },
    { code: "+243", name: "Congo (DRC)", flag: "🇨🇩" },
    { code: "+682", name: "Cook Islands", flag: "🇨🇰" },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷" },
    { code: "+225", name: "Côte d'Ivoire", flag: "🇨🇮" },
    { code: "+385", name: "Croatia", flag: "🇭🇷" },
    { code: "+53", name: "Cuba", flag: "🇨🇺" },
    { code: "+357", name: "Cyprus", flag: "🇨🇾" },
    { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
    { code: "+45", name: "Denmark", flag: "🇩🇰" },
    { code: "+253", name: "Djibouti", flag: "🇩🇯" },
    { code: "+1", name: "Dominica", flag: "🇩🇲" },
    { code: "+1", name: "Dominican Republic", flag: "🇩🇴" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨" },
    { code: "+20", name: "Egypt", flag: "🇪🇬" },
    { code: "+503", name: "El Salvador", flag: "🇸🇻" },
    { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
    { code: "+291", name: "Eritrea", flag: "🇪🇷" },
    { code: "+372", name: "Estonia", flag: "🇪🇪" },
    { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
    { code: "+500", name: "Falkland Islands", flag: "🇫🇰" },
    { code: "+298", name: "Faroe Islands", flag: "🇫🇴" },
    { code: "+679", name: "Fiji", flag: "🇫🇯" },
    { code: "+358", name: "Finland", flag: "🇫🇮" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+594", name: "French Guiana", flag: "🇬🇫" },
    { code: "+689", name: "French Polynesia", flag: "🇵🇫" },
    { code: "+241", name: "Gabon", flag: "🇬🇦" },
    { code: "+220", name: "Gambia", flag: "🇬🇲" },
    { code: "+995", name: "Georgia", flag: "🇬🇪" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+233", name: "Ghana", flag: "🇬🇭" },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮" },
    { code: "+30", name: "Greece", flag: "🇬🇷" },
    { code: "+299", name: "Greenland", flag: "🇬🇱" },
    { code: "+1", name: "Grenada", flag: "🇬🇩" },
    { code: "+590", name: "Guadeloupe", flag: "🇬🇵" },
    { code: "+1", name: "Guam", flag: "🇬🇺" },
    { code: "+502", name: "Guatemala", flag: "🇬🇹" },
    { code: "+224", name: "Guinea", flag: "🇬🇳" },
    { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
    { code: "+592", name: "Guyana", flag: "🇬🇾" },
    { code: "+509", name: "Haiti", flag: "🇭🇹" },
    { code: "+504", name: "Honduras", flag: "🇭🇳" },
    { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
    { code: "+36", name: "Hungary", flag: "🇭🇺" },
    { code: "+354", name: "Iceland", flag: "🇮🇸" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+62", name: "Indonesia", flag: "🇮🇩" },
    { code: "+98", name: "Iran", flag: "🇮🇷" },
    { code: "+964", name: "Iraq", flag: "🇮🇶" },
    { code: "+353", name: "Ireland", flag: "🇮🇪" },
    { code: "+972", name: "Israel", flag: "🇮🇱" },
    { code: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "+1", name: "Jamaica", flag: "🇯🇲" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+962", name: "Jordan", flag: "🇯🇴" },
    { code: "+7", name: "Kazakhstan", flag: "🇰🇿" },
    { code: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "+686", name: "Kiribati", flag: "🇰🇮" },
    { code: "+850", name: "North Korea", flag: "🇰🇵" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "+965", name: "Kuwait", flag: "🇰🇼" },
    { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
    { code: "+856", name: "Laos", flag: "🇱🇦" },
    { code: "+371", name: "Latvia", flag: "🇱🇻" },
    { code: "+961", name: "Lebanon", flag: "🇱🇧" },
    { code: "+266", name: "Lesotho", flag: "🇱🇸" },
    { code: "+231", name: "Liberia", flag: "🇱🇷" },
    { code: "+218", name: "Libya", flag: "🇱🇾" },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
    { code: "+370", name: "Lithuania", flag: "🇱🇹" },
    { code: "+352", name: "Luxembourg", flag: "🇱🇺" },
    { code: "+853", name: "Macau", flag: "🇲🇴" },
    { code: "+389", name: "Macedonia", flag: "🇲🇰" },
    { code: "+261", name: "Madagascar", flag: "🇲🇬" },
    { code: "+265", name: "Malawi", flag: "🇲🇼" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾" },
    { code: "+960", name: "Maldives", flag: "🇲🇻" },
    { code: "+223", name: "Mali", flag: "🇲🇱" },
    { code: "+356", name: "Malta", flag: "🇲🇹" },
    { code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
    { code: "+596", name: "Martinique", flag: "🇲🇶" },
    { code: "+222", name: "Mauritania", flag: "🇲🇷" },
    { code: "+230", name: "Mauritius", flag: "🇲🇺" },
    { code: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "+691", name: "Micronesia", flag: "🇫🇲" },
    { code: "+373", name: "Moldova", flag: "🇲🇩" },
    { code: "+377", name: "Monaco", flag: "🇲🇨" },
    { code: "+976", name: "Mongolia", flag: "🇲🇳" },
    { code: "+382", name: "Montenegro", flag: "🇲🇪" },
    { code: "+1", name: "Montserrat", flag: "🇲🇸" },
    { code: "+212", name: "Morocco", flag: "🇲🇦" },
    { code: "+258", name: "Mozambique", flag: "🇲🇿" },
    { code: "+95", name: "Myanmar", flag: "🇲🇲" },
    { code: "+264", name: "Namibia", flag: "🇳🇦" },
    { code: "+674", name: "Nauru", flag: "🇳🇷" },
    { code: "+977", name: "Nepal", flag: "🇳🇵" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "+687", name: "New Caledonia", flag: "🇳🇨" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮" },
    { code: "+227", name: "Niger", flag: "🇳🇪" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "+683", name: "Niue", flag: "🇳🇺" },
    { code: "+672", name: "Norfolk Island", flag: "🇳🇫" },
    { code: "+1", name: "Northern Mariana Islands", flag: "🇲🇵" },
    { code: "+47", name: "Norway", flag: "🇳🇴" },
    { code: "+968", name: "Oman", flag: "🇴🇲" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+680", name: "Palau", flag: "🇵🇼" },
    { code: "+970", name: "Palestine", flag: "🇵🇸" },
    { code: "+507", name: "Panama", flag: "🇵🇦" },
    { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾" },
    { code: "+51", name: "Peru", flag: "🇵🇪" },
    { code: "+63", name: "Philippines", flag: "🇵🇭" },
    { code: "+48", name: "Poland", flag: "🇵🇱" },
    { code: "+351", name: "Portugal", flag: "🇵🇹" },
    { code: "+1", name: "Puerto Rico", flag: "🇵🇷" },
    { code: "+974", name: "Qatar", flag: "🇶🇦" },
    { code: "+262", name: "Réunion", flag: "🇷🇪" },
    { code: "+40", name: "Romania", flag: "🇷🇴" },
    { code: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "+250", name: "Rwanda", flag: "🇷🇼" },
    { code: "+290", name: "Saint Helena", flag: "🇸🇭" },
    { code: "+1", name: "Saint Kitts and Nevis", flag: "🇰🇳" },
    { code: "+1", name: "Saint Lucia", flag: "🇱🇨" },
    { code: "+508", name: "Saint Pierre and Miquelon", flag: "🇵🇲" },
    { code: "+1", name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
    { code: "+685", name: "Samoa", flag: "🇼🇸" },
    { code: "+378", name: "San Marino", flag: "🇸🇲" },
    { code: "+239", name: "São Tomé and Príncipe", flag: "🇸🇹" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+221", name: "Senegal", flag: "🇸🇳" },
    { code: "+381", name: "Serbia", flag: "🇷🇸" },
    { code: "+248", name: "Seychelles", flag: "🇸🇨" },
    { code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
    { code: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "+421", name: "Slovakia", flag: "🇸🇰" },
    { code: "+386", name: "Slovenia", flag: "🇸🇮" },
    { code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
    { code: "+252", name: "Somalia", flag: "🇸🇴" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
    { code: "+249", name: "Sudan", flag: "🇸🇩" },
    { code: "+597", name: "Suriname", flag: "🇸🇷" },
    { code: "+268", name: "Swaziland", flag: "🇸🇿" },
    { code: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "+963", name: "Syria", flag: "🇸🇾" },
    { code: "+886", name: "Taiwan", flag: "🇹🇼" },
    { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
    { code: "+255", name: "Tanzania", flag: "🇹🇿" },
    { code: "+66", name: "Thailand", flag: "🇹🇭" },
    { code: "+670", name: "Timor-Leste", flag: "🇹🇱" },
    { code: "+228", name: "Togo", flag: "🇹🇬" },
    { code: "+690", name: "Tokelau", flag: "🇹🇰" },
    { code: "+676", name: "Tonga", flag: "🇹🇴" },
    { code: "+1", name: "Trinidad and Tobago", flag: "🇹🇹" },
    { code: "+216", name: "Tunisia", flag: "🇹🇳" },
    { code: "+90", name: "Turkey", flag: "🇹🇷" },
    { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
    { code: "+1", name: "Turks and Caicos Islands", flag: "🇹🇨" },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻" },
    { code: "+256", name: "Uganda", flag: "🇺🇬" },
    { code: "+380", name: "Ukraine", flag: "🇺🇦" },
    { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾" },
    { code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺" },
    { code: "+39", name: "Vatican City", flag: "🇻🇦" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳" },
    { code: "+1", name: "Virgin Islands", flag: "🇻🇮" },
    { code: "+681", name: "Wallis and Futuna", flag: "🇼🇫" },
    { code: "+967", name: "Yemen", flag: "🇾🇪" },
    { code: "+260", name: "Zambia", flag: "🇿🇲" },
    { code: "+263", name: "Zimbabwe", flag: "🇿🇼" }
  ]

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  )

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'why-us', 'leadership', 'our-team', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCEOFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    try {
      const response = await fetch('https://formspree.io/f/mblkpeyv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setShowSuccessMessage(true)
        form.reset()
        setTimeout(() => {
          setShowCEOMessage(false)
          setShowSuccessMessage(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    try {
      const response = await fetch('https://formspree.io/f/xblkpeov', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setShowContactSuccess(true)
        form.reset()
        setSelectedCountry('')
        setTimeout(() => {
          setShowContactSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const services = [
    {
      icon: <Cloud className="w-8 h-8 text-blue-600" />,
      title: "Cloud & Infrastructure",
      description: "AWS, Azure, GCP architecture design, migration, and optimization for scalable, cost-effective solutions."
    },
    {
      icon: <Settings className="w-8 h-8 text-green-600" />,
      title: "DevOps & Automation",
      description: "CI/CD pipelines, Infrastructure as Code, containerization, and automated deployment strategies."
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
      title: "AI, Data & Automation",
      description: "Machine learning pipelines, data analytics, AI integration, and intelligent automation solutions."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Security & Compliance",
      description: "Zero Trust architecture, security audits, compliance frameworks, and threat protection strategies."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "IT Strategy & Consulting",
      description: "Digital transformation roadmaps, technology assessments, and strategic IT planning services."
    },
    {
      icon: <Headphones className="w-8 h-8 text-teal-600" />,
      title: "Managed Support & Maintenance",
      description: "24/7 monitoring, proactive maintenance, incident response, and ongoing system optimization."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Top Bar */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg floating-header" 
             style={{ 
               boxShadow: '0 0 30px rgba(255, 215, 0, 0.7), 0 0 60px rgba(255, 215, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.1)',
               border: '2px solid rgba(255, 215, 0, 0.6)',
               animation: 'headerFloat 4s ease-in-out infinite'
             }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                {/* Logo with blue neon */}
                <div 
                  className="w-12 h-12 rounded-full overflow-hidden"
                  style={{ 
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
                    border: '2px solid rgba(59, 130, 246, 0.8)'
                  }}
                >
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped_circle_image%20%281%29-Q6QOegOf5HgvLwxx8j1COc7jXoNdFV.png"
                    alt="Sulle Solutions Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 font-montserrat hover:border-yellow-500 transition-all duration-300"
                  style={{ fontSize: '16px', fontWeight: '500' }}
                  onClick={() => window.open('https://sulaimanamir.com', '_blank')}
                >
                  Go to CEO's Portfolio
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'why-us', label: 'Why Us' },
                  { id: 'leadership', label: 'Leadership' },
                  { id: 'our-team', label: 'Our Team' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-yellow-600 ${
                      activeSection === item.id ? 'text-yellow-600' : 'text-gray-700'
                    } font-montserrat`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Message CEO Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowCEOMessage(true)}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-full shadow-lg font-montserrat"
          style={{ 
            boxShadow: '0 0 25px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.4)',
            border: '2px solid rgba(255, 215, 0, 0.8)'
          }}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Message the CEO
        </Button>
      </div>

      {/* CEO Message Modal */}
      {showCEOMessage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.85 }}
            onClick={() => setShowCEOMessage(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl z-10">
            <button
              onClick={() => setShowCEOMessage(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-montserrat">Message the CEO</h3>
            
            {showSuccessMessage ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <div className="text-2xl font-bold text-green-600 font-montserrat">Sent!</div>
                <div className="text-gray-600 mt-2">Your message has been delivered successfully.</div>
              </div>
            ) : (
              <form onSubmit={handleCEOFormSubmit} className="space-y-4">
                <div>
                  <Input 
                    name="subject"
                    placeholder="Subject" 
                    className="border-gray-300 font-open-sans"
                    required
                  />
                </div>
                <div>
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="Your Email" 
                    className="border-gray-300 font-open-sans"
                    required
                  />
                </div>
                <div>
                  <Textarea 
                    name="message"
                    placeholder="Your message..." 
                    rows={4} 
                    className="border-gray-300 font-open-sans"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-montserrat"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div 
              className="w-40 h-40 rounded-full overflow-hidden transition-all duration-500 hover:scale-125 cursor-pointer floating-logo"
              style={{ 
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.4), 0 0 120px rgba(255, 215, 0, 0.2)',
                border: '4px solid rgba(255, 215, 0, 0.9)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped_circle_image%20%281%29-Q6QOegOf5HgvLwxx8j1COc7jXoNdFV.png"
                alt="Sulle Solutions Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight font-montserrat"
            style={{ fontSize: '48px' }}
          >
            Empowering Your Business with Intelligent Cloud & IT Solutions
          </h1>
          <p 
            className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-open-sans"
            style={{ fontSize: '20px' }}
          >
            Registered cloud & IT solutions company delivering global services — from Cloud Architecture and AI to DevOps and Consulting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 font-montserrat shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontSize: '16px', boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)' }}
              onClick={() => scrollToSection('contact')}
            >
              Request a Proposal
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-8 py-3 font-montserrat hover:border-yellow-600 transition-all duration-300"
              style={{ fontSize: '16px' }}
              onClick={() => window.open('https://sulaimanamir.com', '_blank')}
            >
              Meet the CEO
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4 font-montserrat"
              style={{ fontSize: '32px' }}
            >
              Our Capabilities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle 
                    className="text-gray-900 font-montserrat"
                    style={{ fontSize: '18px', fontWeight: '600' }}
                  >
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription 
                    className="text-gray-600 font-open-sans"
                    style={{ fontSize: '14px' }}
                  >
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4 font-montserrat"
              style={{ fontSize: '32px' }}
            >
              Why Choose Sulle IT & Cloud Solutions?
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-6">
              {[
                "24/7 global availability",
                "Certified experts in Cloud, AI, DevOps, Security & other fields of IT",
                "Agile scalable delivery",
                "Enterprise-grade security & compliance",
                "Flexible engagement models"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span 
                    className="text-gray-700 font-open-sans"
                    style={{ fontSize: '16px' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4 font-montserrat"
              style={{ fontSize: '32px' }}
            >
              Our Leadership
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Founder */}
            <div 
              className="p-8 rounded-2xl border-2 bg-white shadow-lg"
              style={{ 
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.2)',
                border: '3px solid rgba(255, 215, 0, 0.7)'
              }}
            >
              <h3 
                className="text-xl font-semibold text-gray-900 mb-4 font-montserrat"
                style={{ fontSize: '18px' }}
              >
                Amir Muhammad - Founder & 100% Sole Owner
              </h3>
              <p 
                className="text-gray-600 leading-relaxed font-open-sans"
                style={{ fontSize: '14px' }}
              >
                Visionary businessman and 100% sole owner of Sulle IT & Cloud Solutions. 
                While not having technical experience in the field, Amir brings strategic business acumen and entrepreneurial vision to drive the company's growth and market positioning.
              </p>
            </div>

            {/* CEO */}
            <div 
              className="p-8 rounded-2xl border-2 bg-white shadow-lg"
              style={{ 
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.2)',
                border: '3px solid rgba(255, 215, 0, 0.7)'
              }}
            >
              <h3 
                className="text-xl font-semibold text-gray-900 mb-4 font-montserrat"
                style={{ fontSize: '18px' }}
              >
                Muhammad Sulaiman Amir - CEO
              </h3>
              <p 
                className="text-gray-600 mb-6 leading-relaxed font-open-sans"
                style={{ fontSize: '14px' }}
              >
                AWS Certified Cloud Solutions Architect with 4+ years of experience designing secure, scalable, and production-grade cloud infrastructure. 
                IBM-certified in Artificial Intelligence and Cybersecurity, specializing in DevOps, MLOps, and Zero Trust security architectures. 
                Expert in Infrastructure-as-Code, Kubernetes orchestration, CI/CD pipeline automation, and comprehensive cloud solutions.
              </p>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-montserrat"
                style={{ fontSize: '16px' }}
                onClick={() => window.open('https://sulaimanamir.com', '_blank')}
              >
                View CEO Portfolio
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </section>

      {/* Our Team Section */}
      <section id="our-team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4 font-montserrat"
              style={{ fontSize: '32px' }}
            >
              Our Highly Skilled Team
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans"
              style={{ fontSize: '18px' }}
            >
              Our global team of certified experts provides round-the-clock support and expertise across all time zones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: <Cloud className="w-8 h-8 text-white" />, title: "Cloud Architects", desc: "AWS, Azure, GCP certified professionals designing scalable infrastructure", color: "from-blue-500 to-blue-600" },
              { icon: <Settings className="w-8 h-8 text-white" />, title: "DevOps Engineers", desc: "Automation specialists streamlining deployment and operations", color: "from-green-500 to-green-600" },
              { icon: <Cpu className="w-8 h-8 text-white" />, title: "AI Specialists", desc: "Machine learning and AI integration experts", color: "from-purple-500 to-purple-600" },
              { icon: <Shield className="w-8 h-8 text-white" />, title: "Security Experts", desc: "Cybersecurity professionals ensuring enterprise-grade protection", color: "from-red-500 to-red-600" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-montserrat">{item.title}</h3>
                <p className="text-gray-600 font-open-sans text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2 font-montserrat">24/7</div>
                <div className="text-gray-900 font-semibold mb-1 font-montserrat">Global Coverage</div>
                <div className="text-gray-600 text-sm font-open-sans">Round-the-clock support across all time zones</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2 font-montserrat">✓</div>
                <div className="text-gray-900 font-semibold mb-1 font-montserrat">Certified Experts</div>
                <div className="text-gray-600 text-sm font-open-sans">Industry-certified professionals at your service</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2 font-montserrat">99.9%</div>
                <div className="text-gray-900 font-semibold mb-1 font-montserrat">Uptime Guarantee</div>
                <div className="text-gray-600 text-sm font-open-sans">Reliable infrastructure and monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4 font-montserrat"
              style={{ fontSize: '32px' }}
            >
              Get in Touch
            </h2>
            <p 
              className="text-gray-600 font-open-sans"
              style={{ fontSize: '16px' }}
            >
              Ready to build something transformative? Let's talk.
            </p>
          </div>
          
          {showContactSuccess && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-green-100 border border-green-300 rounded-lg">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div className="text-green-800 font-montserrat font-semibold">Sent! Your message has been delivered successfully.</div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleContactFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input 
                      name="name"
                      placeholder="Your Name" 
                      className="border-gray-300 font-open-sans"
                      style={{ fontSize: '14px' }}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="Email Address" 
                      className="border-gray-300 font-open-sans"
                      style={{ fontSize: '14px' }}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Input 
                    name="company"
                    placeholder="Company Name" 
                    className="border-gray-300 font-open-sans"
                    style={{ fontSize: '14px' }}
                  />
                </div>
                
                {/* Business Number with Country Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 font-montserrat">Business Number (Optional)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-open-sans text-left bg-white"
                        style={{ fontSize: '14px' }}
                      >
                        {selectedCountry || "Select Country Code"}
                      </button>
                      
                      {showCountryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                          <div className="p-2 border-b border-gray-200">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                type="text"
                                placeholder="Search countries..."
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="pl-10 border-gray-300"
                                style={{ fontSize: '14px' }}
                              />
                            </div>
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.map((country, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(`${country.flag} ${country.code} ${country.name}`)
                                  setShowCountryDropdown(false)
                                  setCountrySearch('')
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 font-open-sans"
                                style={{ fontSize: '14px' }}
                              >
                                {country.flag} {country.code} {country.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <Input 
                        name="business_number"
                        placeholder="Business Number" 
                        className="border-gray-300 font-open-sans"
                        style={{ fontSize: '14px' }}
                      />
                      <input type="hidden" name="country_code" value={selectedCountry} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your project..." 
                    rows={6} 
                    className="border-gray-300 font-open-sans"
                    style={{ fontSize: '14px' }}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-montserrat"
                  style={{ fontSize: '16px' }}
                >
                  Send Message
                </Button>
              </form>
            </div>
            <div className="space-y-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <p 
                    className="font-medium text-gray-900 font-montserrat"
                    style={{ fontSize: '14px' }}
                  >
                    +1 586-999-9957 (calls only)
                  </p>
                  <p 
                    className="text-gray-600 text-sm font-open-sans"
                    style={{ fontSize: '14px' }}
                  >
                    24/7 Support
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <p 
                    className="font-medium text-gray-900 font-montserrat"
                    style={{ fontSize: '14px' }}
                  >
                    mail@sulaimanamir.com
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <p 
                    className="font-medium text-gray-900 font-montserrat"
                    style={{ fontSize: '14px' }}
                  >
                    Remote, global availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 
                className="text-xl font-bold mb-4 font-montserrat"
              >
                Sulle IT & Cloud Solutions
              </h3>
              <p 
                className="text-gray-400 mb-4 font-montserrat"
                style={{ fontSize: '12px', fontWeight: '300' }}
              >
                Registered Cloud & IT Solutions Company.
              </p>
            </div>
            <div>
              <nav className="flex flex-wrap gap-6">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'leadership', label: 'About' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-white transition-colors font-montserrat"
                    style={{ fontSize: '14px' }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p 
              className="text-gray-400 font-montserrat"
              style={{ fontSize: '12px', fontWeight: '300' }}
            >
              © 2025 Sulle IT & Cloud Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
