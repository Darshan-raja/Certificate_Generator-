
    // Set today's date as default
    document.getElementById('dateInput').valueAsDate = new Date();

    function generateCertificate() {
      const name = document.getElementById("nameInput").value.trim();
      const course = document.getElementById("courseSelect").value;
      const date = document.getElementById("dateInput").value;
      
      if (name === "") {
        alert("Please enter the recipient's name!");
        return;
      }
      
      if (date === "") {
        alert("Please select a completion date!");
        return;
      }

      // Update certificate content
      document.getElementById("userName").textContent = name;
      document.getElementById("courseName").textContent = course;
      document.getElementById("completionDate").textContent = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Generate unique certificate ID
      const certificateId = 'CERT-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
      document.getElementById("certificateId").textContent = certificateId;

      // Show certificate and action buttons
      document.getElementById("certificate").style.display = "block";
      document.getElementById("actionButtons").style.display = "block";
      
      // Scroll to certificate
      setTimeout(() => {
        document.getElementById("certificate").scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    function resetForm() {
      document.getElementById("nameInput").value = "";
      document.getElementById("courseSelect").selectedIndex = 0;
      document.getElementById('dateInput').valueAsDate = new Date();
      document.getElementById("certificate").style.display = "none";
      document.getElementById("actionButtons").style.display = "none";
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function downloadCertificate() {
      // Simple implementation - in a real app, you'd want to use html2canvas or similar
      const certificate = document.getElementById("certificate");
      const name = document.getElementById("userName").textContent;
      const course = document.getElementById("courseName").textContent;
      
      // Create a new window with just the certificate for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${name}</title>
          <style>
            body { font-family: Georgia, serif; margin: 0; padding: 20px; }
            ${document.querySelector('style').innerHTML}
            .certificate { display: block !important; margin: 0; box-shadow: none; }
          </style>
        </head>
        <body>
          ${certificate.outerHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      
      // Trigger print dialog
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }

    // Add some keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.target.id === 'nameInput') {
        generateCertificate();
      }
      if (e.key === 'Escape') {
        resetForm();
      }
    });
