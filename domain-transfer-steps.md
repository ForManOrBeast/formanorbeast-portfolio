# Domain Transfer Steps - For Man or Beast

## Current Status
✅ **Site deployed to Netlify:** https://timely-kringle-738610.netlify.app/  
⏳ **Waiting for:** Authorization code from Squarespace (within 24 hours)

---

## Step 1: Choose Your New Domain Registrar

**Recommended options:**
- **Namecheap** (recommended - good pricing, easy interface)
- **GoDaddy** 
- **Google Domains** (now Google Cloud Domains)
- **Cloudflare Registrar** (if you have Cloudflare account)

---

## Step 2: Initiate Domain Transfer

### Once you receive the authorization code email:

1. **Create an account** at your chosen registrar (if you don't have one)
2. **Look for "Transfer Domain"** or "Domain Transfer" option
3. **Enter your domain:** `formanorbeast.com`
4. **Enter the authorization code** (from the Squarespace email)
5. **Complete checkout** (~$10-15, includes 1-year renewal)
6. **Confirm transfer via email** when prompted (important!)

---

## Step 3: Wait for Transfer Completion (5-7 days)

### What happens during transfer:
- Squarespace has 5 days to approve/deny the transfer
- Usually auto-approves after 5 days if no action taken
- You'll receive email updates on transfer status
- **Don't cancel Squarespace hosting until transfer is 100% complete**

---

## Step 4: Update DNS (After Transfer Completes)

### In your new registrar's control panel:

1. **Delete all existing DNS records**
2. **Add these DNS records:**

```
Record Type: A
Name: @ (or leave blank)
Value: 75.2.60.5
TTL: Auto or 3600

Record Type: CNAME  
Name: www
Value: timely-kringle-738610.netlify.app
TTL: Auto or 3600
```

### In Netlify dashboard:
1. Go to **Domain settings** → **Custom domains**
2. **Add custom domain:** `formanorbeast.com`
3. Netlify will automatically enable SSL certificate

---

## Step 5: Test & Go Live (24-48 hours after DNS update)

### Final verification:
- DNS propagation takes 24-48 hours
- Test your site at: **https://formanorbeast.com**
- Should show your new portfolio!
- SSL certificate should be active (🔒 lock icon)

---

## Important Reminders

### During Transfer:
- ⚠️ **Keep Squarespace active** until domain fully transfers
- ⚠️ **Your email may be affected** - plan accordingly
- ⚠️ **Don't make DNS changes** until transfer completes
- ✅ **Netlify site stays live** throughout the process

### After Transfer:
- 🎉 **formanorbeast.com** will point to your new portfolio
- 🔒 **SSL certificate** will be automatically enabled
- 📧 **Set up email hosting** if needed (Google Workspace, etc.)
- 🏠 **Update business cards/links** to new hosting

---

## Timeline Summary

| Day | Action |
|-----|--------|
| **Today** | Wait for auth code email from Squarespace |
| **Day 1-2** | Initiate transfer with new registrar |
| **Day 5-7** | Transfer completes |
| **Day 8-9** | Update DNS records |
| **Day 10-11** | Site live on formanorbeast.com |

---

## Troubleshooting

### If Transfer Gets Stuck:
- Check spam folder for approval emails
- Contact new registrar support
- Contact Squarespace support

### If Site Doesn't Load:
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Use DNS checker tools online

### If Email Stops Working:
- Set up email forwarding at new registrar
- Consider Google Workspace for professional email

---

## Contact Info
- **Netlify Site:** https://timely-kringle-738610.netlify.app/
- **Target Domain:** formanorbeast.com
- **Email:** nick@formanorbeast.com

**Next Step:** Wait for authorization code email, then choose a registrar and initiate transfer!