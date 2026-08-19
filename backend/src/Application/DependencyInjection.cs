using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static  class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        //mediatr kütüphanesini bu katmanda tüm handlerlar için otomatik kaydedicez

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly));

        return services;
    }

}