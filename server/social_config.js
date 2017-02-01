import { ServiceConfiguration } from 'meteor/service-configuration';

// ==========================
// Reset ServiceConfiguration
// ==========================
// First, we reset any service configuration already present

ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
ServiceConfiguration.configurations.remove({
	service: 'twitter'
});
ServiceConfiguration.configurations.remove({
	service: 'google'
});
ServiceConfiguration.configurations.remove({
	service: 'linkedin'
});
ServiceConfiguration.configurations.remove({
	service: 'pinterest'
});
ServiceConfiguration.configurations.remove({
	service: 'instagram'
});


// ======================
// Setting Up Credentials
// ======================
// Then we setup credentials for each service

// Facebook (Development)
ServiceConfiguration.configurations.insert({
	service: 'facebook',
	appId: '943741995643922',
	secret: '6ca48aa92ee91b1bf30d38c9b609f766'
});

// Twitter (Development)
ServiceConfiguration.configurations.insert({
	service: 'twitter',
	consumerKey: '1Scmykinx39JgSGgAm8CxapEw',
	secret: 'CTYqmRkMC09urf61haguPnU7MPWyw97AXaDWDXMiZgoK5T90m8'
});


// Google (Development)
ServiceConfiguration.configurations.insert({
	service: 'google',
	clientId: '688333420130-7pc9d108lfol64anj81b29goqm5c1hm1.apps.googleusercontent.com',
	secret: 'jeEJnL9HVyqV1L2MkSBPLhzY'
});

// Linkedin (Development)
ServiceConfiguration.configurations.insert({
	service: 'linkedin',
	clientId: '7772qe46lshbh0',
	secret: 'vitvWDvUHx4ANEnL'
});

// Pinterest (Development)
ServiceConfiguration.configurations.insert({
	service: 'pinterest',
	clientId: '4843676878571061787',
	secret: '46206dcd6cec6d0a63701176b05b2e47c8d8ec9b4f59b17ab319b4cee801d63b'
});

// Instagram (Development)
ServiceConfiguration.configurations.insert({
	service: 'instagram',
  	scope: ['basic', 'follower_list' , 'likes' , 'public_content' ,'relationships', 'comments'],
	clientId: '82ab52816ae14e49ac6eca4c1986c7d3',
	secret: '83547966969c45f1a56a7c4e54d0d1a7'
});
