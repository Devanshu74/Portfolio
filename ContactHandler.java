import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ContactHandler
 *
 * This servlet handles form submissions from the contact form on the portfolio website.
 * It processes the name, email, and message fields, validates them, and provides a response.
 *
 * To integrate this with the HTML form:
 * 1. Change the form action in index.html to point to this servlet (e.g., action="/ContactHandler")
 * 2. Deploy this servlet on a Java web server like Apache Tomcat
 * 3. Ensure the servlet is properly configured in web.xml or use annotations as shown
 *
 * Note: This is a basic example. In a production environment, you would want to:
 * - Store the data in a database
 * - Send confirmation emails
 * - Implement proper error handling and security measures
 */
@WebServlet("/ContactHandler")
public class ContactHandler extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ContactHandler() {
        super();
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response content type
        response.setContentType("text/html");

        // Get form parameters
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String message = request.getParameter("message");

        // Basic validation
        if (name == null || name.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            message == null || message.trim().isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            PrintWriter out = response.getWriter();
            out.println("<html><body>");
            out.println("<h2>Error: All fields are required</h2>");
            out.println("<a href='index.html'>Go back to contact form</a>");
            out.println("</body></html>");
            return;
        }

        // Simple email validation (basic regex)
        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            PrintWriter out = response.getWriter();
            out.println("<html><body>");
            out.println("<h2>Error: Invalid email format</h2>");
            out.println("<a href='index.html'>Go back to contact form</a>");
            out.println("</body></html>");
            return;
        }

        // Process the form data (in a real application, save to database or send email)
        // For this example, we'll just log it and send a success response
        System.out.println("New contact form submission:");
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Message: " + message);

        // Send success response
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>Thank you for your message, " + name + "!</h2>");
        out.println("<p>We have received your message and will get back to you soon.</p>");
        out.println("<a href='index.html'>Return to Portfolio</a>");
        out.println("</body></html>");
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     * Redirect GET requests to the main page
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("index.html");
    }
}
