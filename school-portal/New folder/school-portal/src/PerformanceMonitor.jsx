import { useEffect } from 'react'

const sendToGoogleAnalytics = ({ name, delta, id }) => {
  // In a real implementation, you would send this data to analytics
  console.log(`[${name}] ${delta}`, id)
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Dynamically import web-vitals to avoid build issues
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure Core Web Vitals
      getCLS(sendToGoogleAnalytics)
      getFID(sendToGoogleAnalytics)
      getFCP(sendToGoogleAnalytics)
      getLCP(sendToGoogleAnalytics)
      getTTFB(sendToGoogleAnalytics)
    }).catch(error => {
      console.warn('Web Vitals failed to load', error)
    })
  }, [])

  return null // This component doesn't render anything
}

export default PerformanceMonitor