using System;
using backend.Models;
using Microsoft.Extensions.Options;
using Stripe;

namespace backend.Services;

public class StripeService
{
    private readonly StripeSettings _stripeSettings;

    public StripeService(IOptions<StripeSettings> stripeSettings)
    {
        _stripeSettings = stripeSettings.Value;
        StripeConfiguration.ApiKey = _stripeSettings.SecretKey; // Set the Stripe secret key
    }

    public Charge CreateCharge(decimal amount, string currency, string description, string stripeToken)
    {
        var chargeOptions = new ChargeCreateOptions
        {
            Amount = (long)(amount * 100), // Stripe expects amount in cents
            Currency = currency,
            Description = description,
            Source = stripeToken // Token from frontend
        };

        var chargeService = new ChargeService();
        var charge = chargeService.Create(chargeOptions);

        return charge;
    }
}
