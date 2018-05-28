FROM microsoft/aspnetcore:2.0-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-nanoserver-1709 AS build
WORKDIR /src
COPY Coupon.API/Coupon.API.csproj Coupon.API/
COPY Coupon.Data.Cache/Coupon.Data.Cache.csproj Coupon.Data.Cache/
COPY Coupon.Data/Coupon.Data.csproj Coupon.Data/
COPY Coupon.Services/Coupon.Services.csproj Coupon.Services/
COPY Coupon.Forms/Coupon.Forms.csproj Coupon.Forms/
COPY Coupon.Common/Coupon.Common.csproj Coupon.Common/
COPY Coupon.DAL/Coupon.DAL.csproj Coupon.DAL/
COPY Coupon.Dto/Coupon.Dto.csproj Coupon.Dto/
COPY Coupon.Web.Utils/Coupon.Web.Utils.csproj Coupon.Web.Utils/
RUN dotnet restore Coupon.API/Coupon.API.csproj
COPY . .
WORKDIR /src/Coupon.API
RUN dotnet build Coupon.API.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Coupon.API.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Coupon.API.dll"]
