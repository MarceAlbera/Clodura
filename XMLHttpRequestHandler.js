(win => {
    const extendXMLHttp = () => {
      const XHR = XMLHttpRequest.prototype;
      const { send, open } = XHR;
      const baseUrl = 'https://www.linkedin.com/';
      const navigatorContactProfileUrl = `${baseUrl}sales-api/salesApiProfiles/(profileId:`;
      const navigatorListUrl = `${baseUrl}sales-api/salesApiLeadSearch`;
      const linkedinListUrlV1 = `${baseUrl}voyager/api/search/blended?`;
      const linkedinListUrlV2 = `${baseUrl}voyager/api/voyagerSearchDashLazyLoadedActions?`;
      const navigatorCompanyListUrl = `${baseUrl}sales-api/salesApiAccountSearch`;
      const recruiterListUrl = `${baseUrl}recruiter/api/smartsearch?`;
      const recruiterListUrlPremium = `${baseUrl}talent/search/api/talentRecruiterSearchHits?`;
      const recruiterTokenUrl = `${baseUrl}recruiter/api/inProductEducation`;
      const linkedinProfileUrl = `${baseUrl}voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:`;
      const linkedinProfileUrl2 = `${baseUrl}voyager/api/graphql?variables=(profileUrn:`;
      const linekdinProfileTopCardUrl = `${baseUrl}voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=`
      const linekdinProfileTopCardInfo1 = 'TopCardSupplementary'; // for contact's other info
      const linekdinProfileTopCardInfo2 = 'WebTopCardCore'; // for contact location info
      const navigatorCompanyProfileUrl = `${baseUrl}sales-api/salesApiCompanies`;
      const leadListUrl = `${baseUrl}sales-api/salesApiPeopleSearch`;
      const accountListUrl = `${baseUrl}sales-api/salesApiCompanySearch`;
      const linkedinCompanyProfileUrl = `${baseUrl}voyager/api/organization/companies?decorationId=`;
      const linkedinCompanyProfileUrlNew = `${baseUrl}voyager/api/voyagerOrganizationDashCompanies?decorationId=`
  
      XHR.open = function(...args) {
        this.url = args.url; // the request url
        return open.apply(this, args);
      };
  
      XHR.send = function(...args) {
        this.addEventListener('load', event => {
          if (event.target.responseURL.includes(navigatorContactProfileUrl) && event.target.responseURL.includes('flagshipProfileUrl')) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setNavigatorContactProfileData', { detail }));
            });
          }
          if (event.target.responseURL.includes(navigatorCompanyProfileUrl)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setNavigatorCompanyProfileData', { detail }));
            });
          }
          if (event.target.responseURL.includes(navigatorListUrl)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setNavigatorSearchData', { detail }));
            });
          }
          if (event.target.responseURL.includes(navigatorCompanyListUrl)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setNavigatorCompanySearchData', { detail }));
            });
          }
          if (event.target.responseURL.includes(linekdinProfileTopCardUrl) && event.target.responseURL.includes(linekdinProfileTopCardInfo1)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setlinekdinProfileTopCardInfo1', { detail }));
            });
          }
          if (event.target.responseURL.includes(linekdinProfileTopCardUrl) && event.target.responseURL.includes(linekdinProfileTopCardInfo2)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setlinekdinProfileTopCardInfo2', { detail }));
            });
          }
          if (event.target.responseURL.includes(linkedinProfileUrl)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setlinkedinProfleData', { detail }));
            });
          }
          if (event.target.responseURL.includes(leadListUrl)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setLeadListData', { detail }));
            });
          }
          if (event.target.responseURL.includes(accountListUrl)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setAccountListData', { detail }));
            });
          }
          if (event.target.responseURL.includes(linkedinProfileUrl2)) {
            event.target.response.text().then(detail => {
                // console.log(JSON.parse(detail));
              win.dispatchEvent(new CustomEvent('setlinkedinProfleData', { detail }));
            });
          }
          if (event.target.responseURL.includes(linkedinListUrlV1)) {
            event.target.response.text().then(detail => {
              win.dispatchEvent(new CustomEvent('setLinkedinSearchData', { detail }));
            });
          }
  
          if (event.target.responseURL.includes(linkedinListUrlV2)) {
            event.target.response.text().then(detail => {
              win.dispatchEvent(new CustomEvent('setLinkedinSearchDataV2', { detail }));
            });
          }
          // if (event.target.responseURL.includes(linkedinCompanyProfileUrl) || event.target.responseURL.includes(linkedinCompanyProfileUrlNew)) {
          //   event.target.response.text().then(detail => {
          //     win.dispatchEvent(new CustomEvent('setLinkedinCompanyProfileData', { detail }));
          //   });
          // }
        });
  
        return send.apply(this, args);
      };
    };
    const XHRInterval = setInterval(() => {
      if ({}.hasOwnProperty.call(XMLHttpRequest.prototype, 'DONE')) {
        extendXMLHttp();
        clearInterval(XHRInterval);
      }
    }, 100);
    // navigator URL change watcher
    if (window.location.href.includes('https://www.linkedin.com/')) {
      const navigatorListRegex = /https:\/\/www\.linkedin.com\/sales\/(search|lists)\/people\/*/;
      const navigatorCompanyListRegex = /https:\/\/www\.linkedin.com\/sales\/(search|lists)\/company\/*/;

      window.history.pushState = (f =>
        function pushState(...args) {
          const ret = f.apply(this, args);
          window.dispatchEvent(new Event('pushstate'));
          window.dispatchEvent(new Event('locationchange'));
          return ret;
        })(window.history.pushState);
  
      window.history.replaceState = (f =>
        function replaceState(...args) {
          const ret = f.apply(this, args);
          window.dispatchEvent(new Event('replacestate'));
          window.dispatchEvent(new Event('locationchange'));
          return ret;
        })(window.history.replaceState);
  
      window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
      });
      window.addEventListener('locationchange', () => {
        if(window.location.href.includes('https://www.linkedin.com/sales/')){
          if (navigatorListRegex.test(window.location.href)) {
            win.dispatchEvent(new CustomEvent('setNavigatorSearchData', { detail: 'domSync' }));
          }
          if (navigatorCompanyListRegex.test(window.location.href)){
            win.dispatchEvent(new CustomEvent('setNavigatorCompanySearchData', { detail: 'domSync' }));
          }
        } else if(window.location.href.includes('https://www.linkedin.com/in') && !window.location.href.includes('miniProfileUrn')){
          win.dispatchEvent(new CustomEvent('setlinkedinProfleData', { detail: 'domSync' }));
        }
      });
    }
  })(window, document);