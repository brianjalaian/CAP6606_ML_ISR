// Netlify Function: Validate Promo Code
// This function validates promo codes and assigns the 'promo' role to users

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check authentication
  const { identity, user } = context.clientContext || {};

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'You must be logged in to use a promo code.' })
    };
  }

  // Parse request body
  let code;
  try {
    const body = JSON.parse(event.body);
    code = body.code?.toUpperCase().trim();
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body.' })
    };
  }

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Promo code is required.' })
    };
  }

  // Get valid promo codes from environment variable
  // Set VALID_PROMO_CODES in Netlify dashboard as comma-separated: UWF-ML2026,SPRING2026,DEMO
  const validCodes = (process.env.VALID_PROMO_CODES || 'UWF-ML2026,DEMO')
    .split(',')
    .map(c => c.trim().toUpperCase());

  // Validate the code
  if (!validCodes.includes(code)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid promo code. Please check and try again.' })
    };
  }

  // Code is valid - update user's role to 'promo'
  try {
    const adminUrl = identity.url;
    const adminToken = identity.token;

    // Update user's app_metadata to add 'promo' role
    const response = await fetch(`${adminUrl}/admin/users/${user.sub}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_metadata: {
          roles: ['promo']
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to update user role:', errorText);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to activate promo code. Please try again.' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Promo code activated! You now have full access.',
        role: 'promo'
      })
    };

  } catch (error) {
    console.error('Error updating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error. Please try again later.' })
    };
  }
};
