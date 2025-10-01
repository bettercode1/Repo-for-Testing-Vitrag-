/**
 * Report Helper Utilities
 * Handles report generation in both development and production environments
 */

/**
 * Opens a report in a new window with error handling
 * @param {string} reportPath - Path to the HTML report file (e.g., '/cubeTestingReport.html')
 * @param {object} data - Data to pass as URL parameters
 * @param {string} reportName - Name of the report for error messages
 */
export const openReport = (reportPath, data, reportName = 'Report') => {
  try {
    // Build URL parameters from data object
    const params = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    
    // Get the base URL for production vs development
    const baseUrl = window.location.origin;
    
    // Construct full URL
    const reportUrl = `${baseUrl}${reportPath}?${params.toString()}`;
    
    console.log(`📄 Opening ${reportName}:`, reportUrl);
    
    // Open in new window
    const newWindow = window.open(reportUrl, '_blank');
    
    if (!newWindow) {
      throw new Error('Popup blocked. Please allow popups for this site.');
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error opening ${reportName}:`, error);
    alert(`Failed to open ${reportName}: ${error.message}\n\nPlease ensure popups are allowed and try again.`);
    return false;
  }
};

/**
 * Validate that required data exists before opening report
 * @param {object} data - Data object to validate
 * @param {array} requiredFields - Array of required field names
 * @returns {object} - {valid: boolean, missing: array}
 */
export const validateReportData = (data, requiredFields = []) => {
  const missing = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field] === '' || data[field] === 'N/A') {
      missing.push(field);
    }
  });
  
  return {
    valid: missing.length === 0,
    missing
  };
};

/**
 * Check if observations and strength data are complete
 * @param {object} observationsData - Observations data from backend
 * @param {object} strengthData - Strength graph data from backend
 * @returns {object} - {complete: boolean, message: string}
 */
export const checkReportDataCompleteness = (observationsData, strengthData) => {
  const issues = [];
  
  // Check observations data
  if (!observationsData || Object.keys(observationsData).length === 0) {
    issues.push('Test observations are missing. Please complete the observations first.');
  }
  
  // Check strength data
  if (!strengthData || Object.keys(strengthData).length === 0) {
    issues.push('Strength graph data is missing. Please complete the strength graph first.');
  }
  
  // Check if strength values exist
  if (strengthData && (!strengthData.actual_7 && !strengthData.actual_14 && !strengthData.actual_28)) {
    issues.push('No strength test results found. Please enter strength values.');
  }
  
  return {
    complete: issues.length === 0,
    message: issues.join(' ')
  };
};

/**
 * Fetch test data with observations and strength from backend
 * @param {number} testRequestId - Test request ID
 * @param {function} getApiUrl - Function to get API URL
 * @returns {Promise<object>} - Complete test data
 */
export const fetchCompleteTestData = async (testRequestId, getApiUrl) => {
  try {
    const axios = require('axios').default;
    
    console.log('📥 Fetching complete test data for ID:', testRequestId);
    
    const response = await axios.get(getApiUrl(`/test-requests/${testRequestId}/details`));
    const data = response.data;
    
    console.log('✅ Raw data from backend:', data);
    
    // Get the first concrete test
    const firstTest = data.concrete_tests?.[0] || {};
    
    // Parse JSON fields safely
    let strengthData = {};
    let observationsData = {};
    
    try {
      if (firstTest.test_results_json) {
        strengthData = typeof firstTest.test_results_json === 'string' 
          ? JSON.parse(firstTest.test_results_json)
          : firstTest.test_results_json;
      }
      
      if (firstTest.observations_json) {
        observationsData = typeof firstTest.observations_json === 'string'
          ? JSON.parse(firstTest.observations_json)
          : firstTest.observations_json;
      }
    } catch (parseError) {
      console.error('❌ Error parsing JSON fields:', parseError);
    }
    
    console.log('✅ Parsed strengthData:', strengthData);
    console.log('✅ Parsed observationsData:', observationsData);
    
    return {
      testRequest: data.test_request,
      customer: data.customer,
      concreteTest: firstTest,
      strengthData,
      observationsData,
      raw: data
    };
  } catch (error) {
    console.error('❌ Error fetching complete test data:', error);
    throw new Error(`Failed to fetch test data: ${error.message}`);
  }
};

export default {
  openReport,
  validateReportData,
  checkReportDataCompleteness,
  fetchCompleteTestData
};

