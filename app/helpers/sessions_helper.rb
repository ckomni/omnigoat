module SessionsHelper

	# Logs in the given user.
	def log_in
		session[:authorization] = true
	end

	# Returns true if the user is logged in, false otherwise.
	def authorized?
		if session[:authorization]
			return true
		else
			return false
		end
	end

	# Logs out the current user.
	def log_out
		session.delete(:authorization)
	end

	def redirect_back_or(default)
		redirect_to(session[:forwarding_url] || default)
		session.delete(:forwarding_url)
	end

	def store_location
		session[:forwarding_url] = request.url if request.get?
	end
end
